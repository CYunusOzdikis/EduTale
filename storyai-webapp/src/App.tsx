// src/App.tsx
import React, { useState } from 'react';
import axios from 'axios';

const App: React.FC = () => {
  const [ageRange, setAgeRange] = useState('');
  const [category, setCategory] = useState('');
  const [topics, setTopics] = useState<string[]>([]);
  const [keywords, setKeywords] = useState('');
  const [questionCount, setQuestionCount] = useState('');
  const [outputFormat, setOutputFormat] = useState('');
  const [story, setStory] = useState('');

  const handleSubmit = () => {
    axios.post('http://localhost:8000/api/generate_story/', {
      ageRange,
      category,
      topics,
      keywords,
      questionCount,
      outputFormat
    })
    .then(response => {
      setStory(response.data.story);
    })
    .catch(error => {
      console.error(error);
    });
  };

  return (
    <div>
      <h1>Hikaye Yazma Asistanı</h1>

      <label>Okuyucu'nun Yaş Aralığı:</label>
      <select value={ageRange} onChange={e => setAgeRange(e.target.value)}>
        <option value="seçilmedi">Seçiniz</option>
        <option value="1-2">1-2</option>
        <option value="3-5">3-5</option>
<option selected="selected" value="6-9">6-9</option>
        <option value="10-13">10-13</option>
        <option value="14-17">14-17</option>
        <option value="18+">18+</option>
      </select>

      <label>Hikaye'nin Kategorisi:</label>
      <select value={category} onChange={e => setCategory(e.target.value)}>
<option selected="selected" value="seçilmedi">Seçiniz</option>
        <option value="Hayvanlar Alemi">Hayvanlar Alemi</option>
        <option value="Aile Yaşamı">Aile Yaşamı</option>
        <option value="Macera">Macera</option>
        <option value="Fabl">Fabl</option>
        {/* Diğer kategoriler */}
      </select>

      <label>Konu Seçimi:</label>
      <select multiple value={topics} onChange={e => setTopics(Array.from(e.target.selectedOptions, option => option.value))}>
<option selected="selected" value="Konu Yok">Konu Yok</option>
        <option value="Kardeşlik">Kardeşlik</option>
        <option value="Paylaşımcılık">Paylaşımcılık</option>
        <option value="Hoşgörü">Hoşgörü</option>
        <option value="Arkadaşlık">Arkadaşlık</option>
        <option value="Cömertlik">Cömertlik</option>
        <option value="Sevgi Saygı">Sevgi Saygı</option>
        {/* Diğer konular */}
      </select>

      <label>Anahtar Kelimeler:</label>
      <input type="text" value={keywords} onChange={e => setKeywords(e.target.value)} placeholder="Virgülle ayrılmış şekilde giriniz" />

      <label>Okuyucu'ya Sorulacak Soru Sayısı:</label>
      <select value={questionCount} onChange={e => setQuestionCount(e.target.value)}>
<option selected="selected" value="Soru Yok">Soru Yok</option>
        <option value="Okuyucuya 1 soru sor">1</option>
        <option value="Okuyucuya 2 soru sor">2</option>
        <option value="Okuyucuya 3 soru sor">3</option>
        <option value="Okuyucuya 4 soru sor">4</option>
        <option value="Okuyucuya 5 soru sor">5</option>
      </select>

      <label>Hikaye Çıktı Biçimi:</label>
      <select value={outputFormat} onChange={e => setOutputFormat(e.target.value)}>
<option selected="selected" value="Düz Metin">Düz Metin</option>
        <option value="Düz Konuşma">Düz Konuşma</option>
        <option value="Canlandırmalı Konuşma">Canlandırmalı Konuşma</option>
      </select>

      <button onClick={handleSubmit}>Hikaye Oluştur</button>

      <label>Hikaye İçeriği:</label>
      <textarea value={story} readOnly rows={10} cols={50}></textarea>
    </div>
  );
};

export default App;
