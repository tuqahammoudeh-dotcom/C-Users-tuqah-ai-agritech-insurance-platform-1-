export const API_KEYS = {
  weather: '2e4ebce9065ac6e1961a132b1ae543a6',
  planet: 'PLAK5abbc3a8666c4723a994b42b64c703cc',
  gemini: '' 
};

export interface WeatherData {
  temp: number;
  humidity: number;
  windSpeed: number;
  description: string;
  icon: string;
}

export interface SatelliteData {
  ndvi: number;
  healthScore: number;
  lastUpdate: string;
}

export async function fetchRealWeather(lat: number, lon: number): Promise<WeatherData> {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEYS.weather}&units=metric&lang=ar`
    );
    if (!response.ok) throw new Error('API failed');
    const data = await response.json();
    return {
      temp: Math.round(data.main.temp),
      humidity: data.main.humidity,
      windSpeed: data.wind.speed,
      description: data.weather[0].description,
      icon: data.weather[0].icon
    };
  } catch (error) {
    return { temp: 28, humidity: 40, windSpeed: 12, description: 'صافي (بيانات تقديرية)', icon: '01d' };
  }
}

export async function fetchSatelliteInsights(lat: number, lon: number): Promise<SatelliteData> {
  const baseNdvi = 0.3 + (Math.sin(lat) + Math.cos(lon)) * 0.2;
  const ndvi = Math.min(Math.max(baseNdvi, 0.1), 0.9);
  return {
    ndvi: parseFloat(ndvi.toFixed(2)),
    healthScore: Math.round(ndvi * 100),
    lastUpdate: 'أيار 2026'
  };
}

export async function getAgentVerdict(context: any): Promise<string> {
  const risks = [];
  if (context.temp < 10) risks.push("خطر الصقيع");
  if (context.ndvi < 0.4) risks.push("ضعف الإنتاجية الخضراء");
  if (context.humidity < 30) risks.push("جفاف حاد");
  const riskStr = risks.length > 0 ? risks.join(' و ') : "استقرار عام";
  return `تقرير وكيل AgriGuard (2026): تم تحليل القطعة ${context.parcel} في ${context.location}. نلاحظ ${riskStr}. ننصح بتفعيل باقة التأمين الشاملة.`;
}

export async function getSmartAIResponse(userMessage: string, context: any) {
  // If user provided a key, use REAL Gemini 1.5 Pro
  if (API_KEYS.gemini) {
     try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent?key=${API_KEYS.gemini}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: `أنت خبير Agri-FinTech أردني لعام 2026. المزارع: ${context.owner}, الموقع: ${context.location}, NDVI: ${context.ndvi}, حرارة: ${context.temp}, تربة: ${context.soil}. تفهم اللهجة الأردنية وتجيب بذكاء. سؤال المزارع: ${userMessage}` }] }]
          })
        }
      );
      const data = await response.json();
      return data.candidates[0].content.parts[0].text;
    } catch (e) {
      console.error("Gemini Error, falling back to Smart Mock");
    }
  }

  // ADVANCED HUMAN-LIKE SIMULATION (No Key Mode)
  await new Promise(r => setTimeout(r, 1200));
  const input = userMessage.trim().toLowerCase();
  const ownerName = context.owner.split(' ')[0];

  // Flexible Intent Matching
  const isAffirmative = /^(اه|نعم|اوك|ماشي|تمام|يلا|موافق|نعم)$/.test(input);
  const isAskingForWeather = /(جو|طقس|مطر|حرارة|شتا|ريح|هوا|توقعات|ايام)/.test(input);
  const isAskingForRisk = /(خطر|مخاطر|مشكلة|خايف|شو بصير|تنبيه)/.test(input);
  const isAskingForAdvice = /(اقترح|نصيحة|شو اعمل|دلني|ساعدني|شو بتنصح)/.test(input);
  const isAskingForStatus = /(وضع|كيف|طمني|شو في|اخبار)/.test(input);

  if (isAffirmative) {
    return `ممتاز يا ${ownerName}! بما إنك موافق، الباقة الشاملة لموسم 2026 في ${context.location} هي الخيار الأضمن. بتغطي كل المخاطر وبدفع نص التكلفة فقط. بدك أحولك لصفحة الدفع لتثبيت العقد؟`;
  }

  if (isAskingForWeather) {
    return `الجو في ${context.location} هالأيام متقلب. حالياً الحرارة ${context.temp}°م، وللـ 3 أيام الجاية التوقعات بتقول فيه رياح شرقية خفيفة مع استقرار بالحرارة. مؤشر NDVI ${context.ndvi} بيحكيلنا إن الأرض رطوبتها ${context.ndvi > 0.4 ? 'ممتازة' : 'بتحتاج ري'} حالياً.`;
  }

  if (isAskingForAdvice || isAskingForStatus) {
    const advice = context.ndvi < 0.4 ? "لازم تزيد الري شوي وتشوف السماد" : "الزرع بأفضل حالاته، بس خلي عينك على تقارير الصقيع";
    return `يا هلا.. طمني عنك. وضع الأرض إجمالاً ${context.ndvi > 0.5 ? 'بجنن وما عليه خوف' : 'بده شوية متابعة منك'}. نصيحتي إلك ركز على ${advice}. وبخصوص التأمين، الباقة الشاملة في ${context.governorate} رح تريح بالك من أي مفاجآت. شو رأيك؟`;
  }

  if (isAskingForRisk) {
    const mainRisk = context.governorate === 'المفرق' ? 'الجفاف الحاد ونقص المي' : 'الصقيع المفاجئ اللي بيضرب بالليل';
    return `المخاطر في ${context.location} لعام 2026 بتتركز بموضوع ${mainRisk}. مؤشر NDVI ${context.ndvi} حالياً بيعطينا تنبيه إنه لازم نكون جاهزين. لهيك التأمين بوزارة الزراعة ضروري جداً هسا لضمان حقك.`;
  }

  return `أبشر يا ${ownerName}، أنا معك وفاهم كل اللي حكيته بخصوص "${userMessage}". كوني مستشارك الذكي، بقدر أحللك وضع الأرض بدقة، أو أحكيلك عن باقات دعم وزارة الزراعة، أو حتى نتوقع الجو سوا. شو حابب نناقش أول؟`;
}
