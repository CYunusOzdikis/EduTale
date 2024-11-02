# api/views.py
import os
from rest_framework.decorators import api_view
from rest_framework.response import Response
import google.generativeai as genai

@api_view(['POST'])
def generate_story(request):
    data = request.data
    # Kullanıcıdan gelen verileri alın
    age_range = data.get('ageRange')
    category = data.get('category')
    topics = data.get('topics')
    keywords = data.get('keywords')
    question_count = data.get('questionCount')
    output_format = data.get('outputFormat')
    # Prompt oluşturun:
    prompt = f"Hikaye Oluşturma İsteği: Yaş Aralığı: {age_range}, Kategori: {category}, Konular: {', '.join(topics)}, Anahtar Kelimeler: {keywords}, Soru Sayısı: {question_count}, Çıktı Biçimi: {output_format}"
    # API anahtarını yapılandırın
    genai.configure(api_key="AIzaSyAlEkjCHBRzVYQyDPO_QkiW3NxRb3kj0js")
    gemini_model = genai.GenerativeModel('gemini-pro')
    # API çağrısı yapın
    response = gemini_model.generate_content(prompt)
    # Sonucu döndürün
    return Response({'story': response.text})
