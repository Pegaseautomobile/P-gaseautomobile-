import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, LogOut, Plus, Trash2, Phone } from 'lucide-react';

export default function PegaseAutomobile() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const [cars, setCars] = useState([
    {
      id: 1,
      marque: 'BMW',
      modele: '320i',
      prix: 18500,
      annee: 2020,
      km: 45000,
      carburant: 'Essence',
      couleur: 'Noir',
      transmission: 'Automatique',
      etat: 'Occasion',
      image: 'https://images.unsplash.com/photo-1552820728-8ac41f1ce891?w=500&h=400&fit=crop'
    }
  ]);
  const [newCar, setNewCar] = useState({
    marque: '',
    modele: '',
    prix: '',
    annee: '',
    km: '',
    carburant: 'Essence',
    couleur: '',
    transmission: 'Manuelle',
    etat: 'Occasion',
    image: ''
  });

  const handleAdminLogin = (e) => {
    e.preventDefault();
    if (adminPassword === 'Pegase123') {
      setIsAdmin(true);
      setAdminPassword('');
    } else {
      alert('Mot de passe incorrect');
    }
  };

  const handleAddCar = () => {
    if (cars.length >= 30) {
      alert('Maximum 30 voitures atteint');
      return;
    }
    if (newCar.marque && newCar.modele && newCar.prix) {
      setCars([...cars, { ...newCar, id: Date.now() }]);
      setNewCar({
        marque: '',
        modele: '',
        prix: '',
        annee: '',
        km: '',
        carburant: 'Essence',
        couleur: '',
        transmission: 'Manuelle',
        etat: 'Occasion',
        image: ''
      });
    }
  };

  const handleDeleteCar = (id) => {
    if (confirm('Supprimer cette voiture?')) {
      setCars(cars.filter(car => car.id !== id));
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' }
    }
  };

  if (isAdmin) {
    return (
      <div className="min-h-screen bg-white text-black">
        <header className="border-b border-black">
          <div className="max-w-6xl mx-auto px-6 py-6 flex justify-between items-center">
            <h1 className="text-3xl font-bold">Pégase Automobile - Admin</h1>
            <button
              onClick={() => setIsAdmin(false)}
              className="flex items-center gap-2 px-4 py-2 bg-black text-white hover:bg-gray-800 transition"
            >
              <LogOut size={18} />
              Déconnexion
            </button>
          </div>
        </header>

        <div className="max-w-6xl mx-auto px-6 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12 p-8 border border-black"
          >
            <h2 className="text-2xl font-bold mb-6">Ajouter une voiture</h2>
            <div className="text-sm text-gray-600 mb-4">
              {cars.length} / 30 voitures
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <input type="text" placeholder="Marque" value={newCar.marque} onChange={(e) => setNewCar({ ...newCar, marque: e.target.value })} className="px-4 py-2 border border-black focus:outline-none" />
              <input type="text" placeholder="Modèle" value={newCar.modele} onChange={(e) => setNewCar({ ...newCar, modele: e.target.value })} className="px-4 py-2 border border-black focus:outline-none" />
              <input type="number" placeholder="Prix" value={newCar.prix} onChange={(e) => setNewCar({ ...newCar, prix: e.target.value })} className="px-4 py-2 border border-black focus:outline-none" />
              <input type="number" placeholder="Année" value={newCar.annee} onChange={(e) => setNewCar({ ...newCar, annee: e.target.value })} className="px-4 py-2 border border-black focus:outline-none" />
              <input type="number" placeholder="Kilométrage" value={newCar.km} onChange={(e) => setNewCar({ ...newCar, km: e.target.value })} className="px-4 py-2 border border-black focus:outline-none" />
              <input type="text" placeholder="Couleur" value={newCar.couleur} onChange={(e) => setNewCar({ ...newCar, couleur: e.target.value })} className="px-4 py-2 border border-black focus:outline-none" />
              <select value={newCar.carburant} onChange={(e) => setNewCar({ ...newCar, carburant: e.target.value })} className="px-4 py-2 border border-black focus:outline-none">
                <option>Essence</option>
                <option>Diesel</option>
                <option>Électrique</option>
              </select>
              <select value={newCar.transmission} onChange={(e) => setNewCar({ ...newCar, transmission: e.target.value })} className="px-4 py-2 border border-black focus:outline-none">
                <option>Manuelle</option>
                <option>Automatique</option>
              </select>
              <input type="url" placeholder="URL Image" value={newCar.image} onChange={(e) => setNewCar({ ...newCar, image: e.target.value })} className="col-span-2 px-4 py-2 border border-black focus:outline-none" />
            </div>

            <button onClick={handleAddCar} disabled={cars.length >= 30} className="w-full py-3 bg-black text-white font-bold">
              <Plus size={18} className="inline mr-2" />
              Ajouter la voiture
            </button>
          </motion.div>

          <h2 className="text-2xl font-bold mb-6">Voitures ({cars.length})</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {cars.map((car) => (
              <motion.div key={car.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="border border-black overflow-hidden">
                {car.image && <img src={car.image} alt={car.marque} className="w-full h-48 object-cover" />}
                <div className="p-4">
                  <h3 className="text-xl font-bold">{car.marque} {car.modele}</h3>
                  <p className="text-2xl font-bold mb-2">{car.prix.toLocaleString()} €</p>
                  <div className="text-sm text-gray-600 space-y-1">
                    <p>Année: {car.annee}</p>
                    <p>KM: {car.km.toLocaleString()}</p>
                    <p>{car.carburant} • {car.transmission} • {car.couleur}</p>
                  </div>
                  <button onClick={() => handleDeleteCar(car.id)} className="w-full py-2 bg-red-600 text-white font-bold mt-4">
                    <Trash2 size={16} className="inline mr-2" />
                    Supprimer
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-black">
      <div className="fixed top-0 right-0 z-50 p-4">
        <button onClick={() => { const pwd = prompt('Mot de passe admin:'); if (pwd === 'Pegase123') setIsAdmin(true); }} className="text-xs text-gray-400">admin</button>
      </div>

      <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen flex flex-col justify-center items-center bg-white border-b-2 border-black">
        <div className="text-center max-w-2xl mx-auto px-6">
          <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-6xl font-bold mb-6">
            Pégase Automobile
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="text-xl text-gray-700 mb-8">
            Trouvez votre prochaine voiture
          </motion.p>
        </div>
      </motion.section>

      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.h2 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="text-4xl font-bold mb-12 text-center">
            Nos voitures ({cars.length})
          </motion.h2>

          {cars.length === 0 ? (
            <p className="text-center text-gray-600 text-lg">Aucune voiture disponible.</p>
          ) : (
            <motion.div variants={containerVariants} initial="hidden" whileInView="visible" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {cars.map((car) => (
                <motion.div key={car.id} variants={itemVariants} className="border-2 border-black overflow-hidden">
                  <div className="relative h-48 overflow-hidden bg-gray-100">
                    {car.image && <motion.img src={car.image} alt={car.marque} className="w-full h-full object-cover" />}
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl font-bold mb-2">{car.marque} {car.modele}</h3>
                    <p className="text-3xl font-bold mb-4">{car.prix.toLocaleString()} €</p>
                    <div className="space-y-2 text-sm text-gray-700 mb-6 border-t border-b py-4">
                      <div className="flex justify-between">
                        <span>Année</span>
                        <span className="font-semibold">{car.annee}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Kilométrage</span>
                        <span className="font-semibold">{car.km.toLocaleString()} km</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Carburant</span>
                        <span className="font-semibold">{car.carburant}</span>
                      </div>
                    </div>
                    <motion.a href="tel:0643486124" className="block w-full py-3 bg-black text-white font-bold text-center">
                      <Phone size={18} className="inline mr-2" />
                      Mettre en relation
                    </motion.a>
                    <p className="text-xs text-gray-600 text-center mt-2">06 43 48 61 24</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      <footer className="border-t-2 border-black py-8 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto text-center text-gray-700">
          <p className="font-semibold">Pégase Automobile</p>
          <p className="text-sm">📞 06 43 48 61 24</p>
        </div>
      </footer>
    </div>
  );
}
