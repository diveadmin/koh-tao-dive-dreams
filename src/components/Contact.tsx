import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Facebook, Instagram, MessageCircle } from 'lucide-react';
import { toast } from 'sonner';

// Do not call emailjs.init with the service ID — we'll pass the public key on send.

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    subject: 'Cursusinformatie',
    message: ''
  });
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const {
      name,
      value
    } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const payload = {
        access_key: 'e4c4edf6-6e35-456a-87da-b32b961b449a',
        subject: 'message from diving in asia',
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        message: formData.message,
      };

      console.log('Sending contact payload to Web3Forms', payload);

      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json().catch(() => ({}));
      console.log('Web3Forms response:', res.status, data);

      if (res.ok && data.success) {
        toast.success("Bericht succesvol verzonden! We nemen snel contact met je op.");
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          subject: 'Cursusinformatie',
          message: ''
        });
      } else {
        const errMsg = data?.message || data?.error || `HTTP ${res.status}`;
        console.error('Web3Forms error:', errMsg, data);
        toast.error(`Verzenden mislukt: ${errMsg}. Probeer het opnieuw.`);
      }
    } catch (error) {
      console.error('Contact form submission failed:', error);
      toast.error(`Verzenden mislukt: ${error instanceof Error ? error.message : 'Onbekende fout'}. Probeer het opnieuw.`);
    } finally {
      setIsSubmitting(false);
    }
  };
  return <section id="contact" className="py-20 bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Neem contact op</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">Klaar om de onderwaterwereld te ontdekken? Neem contact op met Bas om je duikavontuur op Koh Tao te boeken.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h3 className="text-2xl font-bold mb-6">Contactgegevens</h3>
            
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <MapPin className="h-6 w-6 text-blue-400 mt-1" />
                <div>
                  <h4 className="font-semibold text-lg">Locatie</h4>
                  <p className="text-gray-300">
                    Sairee Beach, Koh Tao<br />
                    Surat Thani 84360, Thailand
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <Phone className="h-6 w-6 text-blue-400 mt-1" />
                <div>
                  <h4 className="font-semibold text-lg">Telefoon</h4>
                  <p className="text-gray-300">+66 77 456 789</p>
                  <p className="text-gray-300">+66 89 123 4567</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <Mail className="h-6 w-6 text-blue-400 mt-1" />
                <div>
                  <h4 className="font-semibold text-lg">Email</h4>
                  <p className="text-gray-300">contact@divinginasia.com</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <Clock className="h-6 w-6 text-blue-400 mt-1" />
                <div>
                  <h4 className="font-semibold text-lg">Openingstijden</h4>
                  <p className="text-gray-300">Dagelijks: 07:00 - 19:00</p>
                  <p className="text-gray-300">Noodgevallen: 24/7</p>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <h4 className="font-semibold text-lg mb-4">Volg ons</h4>
              <div className="flex space-x-4">
                <a href="https://www.facebook.com/profile.php?id=61553713498498" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 transition-colors">
                  <Facebook className="h-6 w-6" />
                </a>
                <a href="https://www.instagram.com/pro_diving_asia/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 transition-colors">
                  <Instagram className="h-6 w-6" />
                </a>
                <a href="https://wa.me/66612345678" target="_blank" rel="noopener noreferrer" className="text-green-400 hover:text-green-300 transition-colors">
                  <MessageCircle className="h-6 w-6" />
                </a>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-8">
            <h3 className="text-2xl font-bold mb-6">Stuur ons een bericht</h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Voornaam</label>
                  <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} required className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white" placeholder="Jan" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Achternaam</label>
                  <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} required className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white" placeholder="Jansen" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                <input type="email" name="email" value={formData.email} onChange={handleInputChange} required className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white" placeholder="john@example.com" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Onderwerp</label>
                <select name="subject" value={formData.subject} onChange={handleInputChange} className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white">
                  <option>Cursusinformatie</option>
                  <option>Boeking duiktrip</option>
                  <option>Materiaalverhuur</option>
                  <option>Algemene vraag</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Bericht</label>
                <textarea name="message" value={formData.message} onChange={handleInputChange} required rows={4} className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white" placeholder="Vertel ons over je duikervaring en waar je naar op zoek bent..."></textarea>
              </div>

              <button type="submit" disabled={isSubmitting} className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 font-semibold">
                {isSubmitting ? 'Verzenden...' : 'Bericht versturen'}
              </button>
            </form>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-gray-700 text-center text-gray-400">
          <p>© 2026 Pro Diving Asia. Alle rechten voorbehouden. Mogelijk gemaakt door One Media Asia @ www.onemedia.asia</p>
          <p className="mt-2">Ontdek de magie onder de golven in het duikparadijs van Thailand.</p>
        </div>
      </div>
    </section>;
};
export default Contact;