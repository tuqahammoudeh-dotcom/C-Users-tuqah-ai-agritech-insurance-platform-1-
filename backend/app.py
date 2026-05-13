from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# قاعدة بيانات محاكية للحالات الثلاث
LAND_CASES = {
    "mafraq": {
        "id": "case-mafraq",
        "location": "المفرق - حوض الصبحة",
        "governorate": "المفرق",
        "basin": "الصبحة (4)",
        "parcel_number": "1025",
        "area_dunum": 120,
        "owner": "محمد السرحان",
        "analysis": {
            "ndvi": 0.22,
            "soil_type": "رملية صحراوية",
            "soil_health_score": 45,
            "primary_risk": "الجفاف",
            "risk_level": "High"
        },
        "insurance_offer": {
            "package": "باقة الأمان من الجفاف",
            "moa_support_pct": 70,
            "base_premium_dunum": 15
        }
    },
    "ghor": {
        "id": "case-ghor",
        "location": "دير علا - الأغوار الوسطى",
        "governorate": "البلقاء",
        "basin": "أبو الزيغان (12)",
        "parcel_number": "442",
        "area_dunum": 35,
        "owner": "عيسى العدوان",
        "analysis": {
            "ndvi": 0.65,
            "soil_type": "طينية ثقيلة",
            "soil_health_score": 88,
            "primary_risk": "الصقيع",
            "risk_level": "Medium"
        },
        "insurance_offer": {
            "package": "باقة الحماية من الصقيع",
            "moa_support_pct": 50,
            "base_premium_dunum": 45
        }
    },
    "irbid": {
        "id": "case-irbid",
        "location": "إربد - لواء بني كنانة",
        "governorate": "إربد",
        "basin": "اليرموك (3)",
        "parcel_number": "89",
        "area_dunum": 15,
        "owner": "أحمد عبيدات",
        "analysis": {
            "ndvi": 0.82,
            "soil_type": "حمراء متوسطية",
            "soil_health_score": 92,
            "primary_risk": "الآفات وانجراف التربة",
            "risk_level": "Low"
        },
        "insurance_offer": {
            "package": "الباقة الشاملة للمحاصيل الشجرية",
            "moa_support_pct": 50,
            "base_premium_dunum": 30
        }
    }
}

@app.route('/api/verify-land', methods=['POST'])
def verify_land():
    data = request.json
    case_key = data.get('case_key', 'ghor')
    
    # محاكاة تأخير الشبكة والربط مع دائرة الأراضي
    import time
    time.sleep(1.5)
    
    if case_key in LAND_CASES:
        return jsonify({
            "status": "success",
            "source": "Department of Lands and Survey (DLS)",
            "data": LAND_CASES[case_key]
        })
    return jsonify({"status": "error", "message": "Land not found"}), 404

@app.route('/api/weather-analysis', methods=['GET'])
def get_weather():
    # محاكاة جلب بيانات الطقس
    return jsonify({
        "temperature": 28,
        "humidity": 40,
        "wind_speed": 12,
        "forecast": "Stable for next 48 hours"
    })

if __name__ == '__main__':
    # تشغيل السيرفر على بورت 5000
    app.run(debug=True, port=5000)
