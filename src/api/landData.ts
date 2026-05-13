export interface LandCase {
  id: string;
  locationName: string;
  governorate: string;
  basin: string;
  parcelNumber: string;
  area: number; // بالدونم
  owner: string;
  coordinates: { lat: number; lng: number };
  analysis: {
    ndvi: number;
    soilType: string;
    soilHealth: number;
    primaryRisk: string;
    riskLevel: 'High' | 'Medium' | 'Low';
    weatherTrend: string;
  };
  insurance: {
    recommendedPackage: string;
    officialPolicyId: string;
    basePremium: number;
    moaSupport: number; // نسبة دعم وزارة الزراعة
  };
}

export const LAND_CASES: Record<string, LandCase> = {
  mafraq: {
    id: 'case-mafraq',
    locationName: 'المفرق - حوض الصبحة',
    governorate: 'المفرق',
    basin: 'الصبحة (4)',
    parcelNumber: '1025',
    area: 120,
    owner: 'محمد السرحان',
    coordinates: { lat: 32.33, lng: 36.48 },
    analysis: {
      ndvi: 0.22,
      soilType: 'رملية صحراوية',
      soilHealth: 45,
      primaryRisk: 'نقص الأمطار والجفاف الشديد',
      riskLevel: 'High',
      weatherTrend: 'انخفاض في الهطول المطري بنسبة 20% عن المعدل'
    },
    insurance: {
      recommendedPackage: 'باقة الأمان من الجفاف',
      officialPolicyId: 'MOA-DR-2026',
      basePremium: 15,
      moaSupport: 0.70
    }
  },
  ghor: {
    id: 'case-ghor',
    locationName: 'دير علا - الأغوار الوسطى',
    governorate: 'البلقاء',
    basin: 'أبو الزيغان (12)',
    parcelNumber: '442',
    area: 35,
    owner: 'عيسى العدوان',
    coordinates: { lat: 32.18, lng: 35.61 },
    analysis: {
      ndvi: 0.65,
      soilType: 'طينية ثقيلة',
      soilHealth: 88,
      primaryRisk: 'الصقيع الإشعاعي المفاجئ',
      riskLevel: 'Medium',
      weatherTrend: 'تذبذب حراري ليلي حاد (تحديث 2026)'
    },
    insurance: {
      recommendedPackage: 'باقة الحماية من الصقيع',
      officialPolicyId: 'MOA-FR-2026',
      basePremium: 45,
      moaSupport: 0.50
    }
  },
  irbid: {
    id: 'case-irbid',
    locationName: 'إربد - لواء بني كنانة',
    governorate: 'إربد',
    basin: 'اليرموك (3)',
    parcelNumber: '89',
    area: 15,
    owner: 'أحمد عبيدات',
    coordinates: { lat: 32.65, lng: 35.85 },
    analysis: {
      ndvi: 0.82,
      soilType: 'حمراء متوسطية',
      soilHealth: 92,
      primaryRisk: 'انجراف التربة والآفات الموسمية',
      riskLevel: 'Low',
      weatherTrend: 'رطوبة عالية تزيد من احتمالية الفطريات (موسم 2026)'
    },
    insurance: {
      recommendedPackage: 'الباقة الشاملة للمحاصيل الشجرية',
      officialPolicyId: 'MOA-CH-2026',
      basePremium: 30,
      moaSupport: 0.50
    }
  }
};
