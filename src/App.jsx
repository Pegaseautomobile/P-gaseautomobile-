import React, { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight, X, Phone, LogOut, Plus, Trash2 } from 'lucide-react';

export default function PegaseAutomobile() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const [cars, setCars] = useState([
    {
      id: 1,
      marque: 'Mercedes',
      modele: 'C63 AMG',
      prix: 65000,
      annee: 2023,
      km: 15000,
      carburant: 'Essence',
      couleur: 'Noir',
      transmission: 'Automatique',
      photos: ['https://images.unsplash.com/photo-1552820728-8ac41f1ce891?w=800&h=600&fit=crop', 'https://images.unsplash.com/photo-1542282088-fe8426682b8f?w=800&h=600&fit=crop']
    }
  ]);

  const [selectedCar, setSelectedCar] = useState(null);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const sliderRef = useRef(null);

  const [newCar, setNewCar] = useState({
    marque: '',
    modele: '',
    prix: '',
    annee: '',
    km: '',
    carburant: 'Essence',
    couleur: '',
    transmission: 'Manuelle',
    photos: ''
  });

  const handleAddCar = () => {
    if (cars.length >= 30) {
      alert('Maximum 30 voitures');
      return;
    }
    if (newCar.marque && newCar.modele && newCar.prix) {
      const photos = newCar.photos ? newCar.photos.split(',').map(p => p.trim()) : ['https://images.unsplash.com/photo-1552820728-8ac41f1ce891?w=800&h=600&fit=crop'];
      setCars([...cars, { ...newCar, id: Date.now(), prix: parseInt(newCar.prix), km: parseInt(newCar.km), annee: parseInt(newCar.annee), photos }]);
      setNewCar({ marque: '', modele: '', prix: '', annee: '', km: '', carburant: 'Essence', couleur: '', transmission: 'Manuelle', photos: '' });
    }
  };

  const handleDeleteCar = (id) => {
    if (confirm('Supprimer?')) {
      setCars(cars.filter(car => car.id !== id));
    }
  };

  const handleScroll = (direction) => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: direction === 'left' ? -320 : 320, behavior: 'smooth' });
    }
  };

  if (isAdmin) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: '#f9f9f9' }}>
        <header style={{ backgroundColor: 'white', borderBottom: '2px solid black', padding: '20px' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h1 style={{ fontSize: '28px', fontWeight: 'bold' }}>Pégase Automobile - Admin</h1>
            <button onClick={() => setIsAdmin(false)} style={{ padding: '10px 20px', backgroundColor: 'black', color: 'white', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}>Déconnexion</button>
          </div>
        </header>

        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '30px 20px' }}>
          <div style={{ backgroundColor: 'white', border: '2px solid black', padding: '25px', marginBottom: '40px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '15px' }}>Ajouter une voiture</h2>
            <p style={{ color: '#666', marginBottom: '20px' }}>{cars.length} / 30 voitures</p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px', marginBottom: '15px' }}>
              <input type="text" placeholder="Marque" value={newCar.marque} onChange={(e) => setNewCar({ ...newCar, marque: e.target.value })} style={{ padding: '12px', border: '1px solid #ddd' }} />
              <input type="text" placeholder="Modèle" value={newCar.modele} onChange={(e) => setNewCar({ ...newCar, modele: e.target.value })} style={{ padding: '12px', border: '1px solid #ddd' }} />
              <input type="number" placeholder="Prix" value={newCar.prix} onChange={(e) => setNewCar({ ...newCar, prix: e.target.value })} style={{ padding: '12px', border: '1px solid #ddd' }} />
              <input type="number" placeholder="Année" value={newCar.annee} onChange={(e) => setNewCar({ ...newCar, annee: e.target.value })} style={{ padding: '12px', border: '1px solid #ddd' }} />
              <input type="number" placeholder="KM" value={newCar.km} onChange={(e) => setNewCar({ ...newCar, km: e.target.value })} style={{ padding: '12px', border: '1px solid #ddd' }} />
              <input type="text" placeholder="Couleur" value={newCar.couleur} onChange={(e) => setNewCar({ ...newCar, couleur: e.target.value })} style={{ padding: '12px', border: '1px solid #ddd' }} />
              <select value={newCar.carburant} onChange={(e) => setNewCar({ ...newCar, carburant: e.target.value })} style={{ padding: '12px', border: '1px solid #ddd' }}>
                <option>Essence</option>
                <option>Diesel</option>
                <option>Électrique</option>
              </select>
              <select value={newCar.transmission} onChange={(e) => setNewCar({ ...newCar, transmission: e.target.value })} style={{ padding: '12px', border: '1px solid #ddd' }}>
                <option>Manuelle</option>
                <option>Automatique</option>
              </select>
            </div>

            <textarea placeholder="URLs photos (séparées par virgules)" value={newCar.photos} onChange={(e) => setNewCar({ ...newCar, photos: e.target.value })} style={{ width: '100%', padding: '12px', border: '1px solid #ddd', marginBottom: '15px', minHeight: '60px' }} />

            <button onClick={handleAddCar} disabled={cars.length >= 30} style={{ width: '100%', padding: '15px', backgroundColor: cars.length >= 30 ? '#ccc' : 'black', color: 'white', border: 'none', fontWeight: 'bold', cursor: 'pointer' }}>➕ Ajouter</button>
          </div>

          <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>Voitures ({cars.length})</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
            {cars.map((car) => (
              <div key={car.id} style={{ backgroundColor: 'white', border: '2px solid black', overflow: 'hidden' }}>
                {car.photos && <img src={car.photos[0]} alt={car.marque} style={{ width: '100%', height: '150px', objectFit: 'cover' }} />}
                <div style={{ padding: '15px' }}>
                  <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '8px' }}>{car.marque} {car.modele}</h3>
                  <p style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '10px' }}>{car.prix} €</p>
                  <p style={{ fontSize: '12px', color: '#666', marginBottom: '12px' }}>{car.annee} • {car.km} km</p>
                  <button onClick={() => handleDeleteCar(car.id)} style={{ width: '100%', padding: '10px', backgroundColor: '#d32f2f', color: 'white', border: 'none', fontWeight: 'bold', cursor: 'pointer' }}>🗑️ Supprimer</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'white' }}>
      <div style={{ position: 'fixed', top: '15px', right: '15px', zIndex: 999 }}>
        <button onClick={() => { const pwd = prompt('Mot de passe:'); if (pwd === 'Pegase123') setIsAdmin(true); }} style={{ fontSize: '12px', backgroundColor: 'transparent', border: 'none', color: '#ccc', cursor: 'pointer' }}>admin</button>
      </div>

      <section style={{ minHeight: '100vh', backgroundImage: 'url("https://images.unsplash.com/photo-1460225756917-aacb76c63c38?w=1600&h=900&fit=crop")', backgroundSize: 'cover', backgroundPosition: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', borderBottom: '3px solid black' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.4)' }} />
        <div style={{ textAlign: 'center', color: 'white', position: 'relative', zIndex: 2 }}>
          <h1 style={{ fontSize: '64px', fontWeight: 'bold', marginBottom: '20px' }}>Pégase Automobile</h1>
          <p style={{ fontSize: '24px', marginBottom: '30px' }}>Trouvez votre prochaine voiture</p>
        </div>
      </section>

      <section style={{ padding: '60px 20px', backgroundColor: '#fafafa', borderBottom: '3px solid black' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '40px', textAlign: 'center' }}>Nos voitures ({cars.length})</h2>

          {cars.length === 0 ? (
            <p style={{ textAlign: 'center', fontSize: '18px', color: '#999' }}>Aucune voiture</p>
          ) : (
            <div style={{ position: 'relative' }}>
              <div ref={sliderRef} style={{ display: 'flex', gap: '20px', overflowX: 'auto', paddingBottom: '20px', scrollBehavior: 'smooth' }}>
                {cars.map((car) => (
                  <div key={car.id} onClick={() => { setSelectedCar(car); setCurrentPhotoIndex(0); }} style={{ minWidth: '300px', backgroundColor: 'white', border: '2px solid black', overflow: 'hidden', cursor: 'pointer', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
                    <div style={{ position: 'relative', height: '200px', overflow: 'hidden' }}>
                      {car.photos && <img src={car.photos[0]} alt={car.marque} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}
                      <div style={{ position: 'absolute', top: '10px', right: '10px', backgroundColor: 'black', color: 'white', padding: '4px 12px', fontSize: '12px', fontWeight: 'bold' }}>{car.photos ? car.photos.length : 1} photos</div>
                    </div>
                    <div style={{ padding: '20px' }}>
                      <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '10px' }}>{car.marque} {car.modele}</h3>
                      <p style={{ fontSize: '26px', fontWeight: 'bold', marginBottom: '15px' }}>{car.prix} €</p>
                      <div style={{ fontSize: '13px', color: '#666', marginBottom: '15px' }}>
                        <p>📅 {car.annee}</p>
                        <p>🛣️ {car.km} km</p>
                        <p>⛽ {car.carburant}</p>
                      </div>
                      <button onClick={(e) => { e.stopPropagation(); setSelectedCar(car); setCurrentPhotoIndex(0); }} style={{ width: '100%', padding: '12px', backgroundColor: 'black', color: 'white', border: 'none', fontWeight: 'bold', cursor: 'pointer' }}>Voir détails</button>
                    </div>
                  </div>
                ))}
              </div>

              <button onClick={() => handleScroll('left')} style={{ position: 'absolute', left: '0', top: '50%', transform: 'translateY(-50%)', backgroundColor: 'black', color: 'white', border: 'none', padding: '15px', cursor: 'pointer', zIndex: 10 }}><ChevronLeft size={24} /></button>
              <button onClick={() => handleScroll('right')} style={{ position: 'absolute', right: '0', top: '50%', transform: 'translateY(-50%)', backgroundColor: 'black', color: 'white', border: 'none', padding: '15px', cursor: 'pointer', zIndex: 10 }}><ChevronRight size={24} /></button>
            </div>
          )}
        </div>
      </section>

      {selectedCar && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.9)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '20px' }}>
          <div style={{ backgroundColor: 'white', borderRadius: '8px', maxWidth: '600px', width: '100%', overflow: 'hidden', maxHeight: '90vh', display: 'flex', flexDirection: 'column', position: 'relative' }}>
            <button onClick={() => setSelectedCar(null)} style={{ position: 'absolute', top: '20px', right: '20px', backgroundColor: 'white', border: 'none', padding: '10px', cursor: 'pointer', borderRadius: '50%', zIndex: 1001, boxShadow: '0 2px 8px rgba(0,0,0,0.2)' }}><X size={24} /></button>

            <div style={{ flex: 1, overflow: 'auto' }}>
              {selectedCar.photos && selectedCar.photos.length > 0 && (
                <div>
                  <img src={selectedCar.photos[currentPhotoIndex]} alt={selectedCar.marque} style={{ width: '100%', height: 'auto', maxHeight: '400px', objectFit: 'cover' }} />
                  {selectedCar.photos.length > 1 && (
                    <div style={{ display: 'flex', gap: '8px', padding: '15px', justifyContent: 'center' }}>
                      <button onClick={() => setCurrentPhotoIndex(Math.max(0, currentPhotoIndex - 1))} style={{ padding: '10px 15px', backgroundColor: 'black', color: 'white', border: 'none', cursor: 'pointer' }}>← Précédente</button>
                      <span style={{ padding: '10px 15px', color: '#666', fontSize: '14px' }}>{currentPhotoIndex + 1} / {selectedCar.photos.length}</span>
                      <button onClick={() => setCurrentPhotoIndex(Math.min(selectedCar.photos.length - 1, currentPhotoIndex + 1))} style={{ padding: '10px 15px', backgroundColor: 'black', color: 'white', border: 'none', cursor: 'pointer' }}>Suivante →</button>
                    </div>
                  )}
                </div>
              )}

              <div style={{ padding: '20px', borderTop: '2px solid #eee' }}>
                <h2 style={{ fontSize: '26px', fontWeight: 'bold', marginBottom: '10px' }}>{selectedCar.marque} {selectedCar.modele}</h2>
                <p style={{ fontSize: '28px', fontWeight: 'bold', color: 'black', marginBottom: '20px' }}>{selectedCar.prix} €</p>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', fontSize: '14px', marginBottom: '20px' }}>
                  <div><strong>Année:</strong> {selectedCar.annee}</div>
                  <div><strong>KM:</strong> {selectedCar.km} km</div>
                  <div><strong>Carburant:</strong> {selectedCar.carburant}</div>
                  <div><strong>Transmission:</strong> {selectedCar.transmission}</div>
                  <div><strong>Couleur:</strong> {selectedCar.couleur}</div>
                </div>

                <a href="tel:0643486124" style={{ display: 'block', width: '100%', padding: '15px', backgroundColor: 'black', color: 'white', textAlign: 'center', textDecoration: 'none', fontWeight: 'bold', fontSize: '16px', marginBottom: '10px' }}>📞 Mettre en relation</a>
                <p style={{ textAlign: 'center', fontSize: '13px', color: '#666' }}>06 43 48 61 24</p>
              </div>
            </div>
          </div>
        </div>
      )}

      <footer style={{ borderTop: '3px solid black', padding: '30px 20px', backgroundColor: '#f5f5f5', textAlign: 'center' }}>
        <p style={{ fontWeight: 'bold', fontSize: '16px', marginBottom: '5px' }}>Pégase Automobile</p>
        <p style={{ fontSize: '14px', color: '#666' }}>📞 06 43 48 61 24</p>
        <p style={{ fontSize: '12px', color: '#999', marginTop: '15px' }}>© 2024 Tous droits réservés</p>
      </footer>
    </div>
  );
}
