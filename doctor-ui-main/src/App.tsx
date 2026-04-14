import HeroImage from './assets/doctor-hero.jpg'; // Add your doctor image here
import React, { useState, useRef, useEffect } from 'react';
import { Menu, X } from "lucide-react"; // icons

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

export default function App() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);

  type Procedure = {
    id?: number;
    name?: string;
    description?: string;
  } | string;

  interface Testimonial {
    id?: number;
    content?: string;
    message?: string;
    author?: string;
    name?: string;
  }

  interface Clinic {
    id?: number;
    hospitalName?: string;
    address?: string;
    phone?: string;
    whatsapp?: string;
    imo?: string;
    email?: string;
  }

  // Dynamic Data State
  const [procedures, setProcedures] = useState<Procedure[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [clinics, setClinics] = useState<Clinic[]>([]);

  const [isOpen, setIsOpen] = useState(false);

  // Fetch Data from Backend API
  useEffect(() => {
    fetch(`${API_BASE}/services`).then(res => res.json()).then(data => setProcedures(data)).catch(console.error);
    fetch(`${API_BASE}/testimonials`).then(res => res.json()).then(data => setTestimonials(data)).catch(console.error);
    fetch(`${API_BASE}/clinics`).then(res => res.json()).then(data => setClinics(data)).catch(console.error);
  }, []);



  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => { setFormData({ ...formData, [e.target.name]: e.target.value }); };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(`${API_BASE}/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setShowSuccess(true);
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setShowSuccess(false), 5000);
      }
    } catch (error) {
      console.error("Error submitting contact form:", error);
    }
  };


  const nextTestimonial = () => {
    setTestimonialIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setTestimonialIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };
  const appointmentRef = useRef<HTMLElement | null>(null);

  // Scroll to Appointment section
  const scrollToAppointment = () => {
    const section = document.getElementById("appointment");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="font-sans">
      {/* Navbar */}
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">

          {/* Logo / Name */}
          <h1 className="text-2xl font-bold text-blue-600 cursor-pointer">
            Dr. Md. Sumon Ali
          </h1>

          {/* Desktop Menu */}
          <ul className="hidden md:flex space-x-6">
            <li><a href="#services" className="hover:text-blue-500 transition">Treatments & Services</a></li>
            <li><a href="#about" className="hover:text-blue-500 transition">About</a></li>
            <li><a href="#testimonials" className="hover:text-blue-500 transition">Testimonials</a></li>
            <li><a href="#appointment" className="hover:text-blue-500 transition">Appointment</a></li>
            <li>
              <a
                href="https://wa.me/01930029495"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 hover:text-green-600 transition"
              >
                {/* WhatsApp Logo */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 text-green-600"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 .5C5.64.5.5 5.64.5 12c0 2.11.55 4.14 1.6 5.93L.5 23.5l5.72-1.58A11.46 11.46 0 0 0 12 23.5c6.36 0 11.5-5.14 11.5-11.5S18.36.5 12 .5Zm0 20.67c-1.75 0-3.46-.46-4.95-1.34l-.35-.21-3.4.94.91-3.32-.23-.36a9.45 9.45 0 0 1-1.43-5.03c0-5.26 4.28-9.54 9.54-9.54s9.54 4.28 9.54 9.54S17.26 21.17 12 21.17Zm5.4-7.08c-.29-.14-1.71-.84-1.97-.93-.27-.1-.47-.14-.67.14-.19.29-.77.93-.94 1.12-.17.19-.34.21-.63.07-.29-.14-1.22-.45-2.33-1.43-.86-.77-1.44-1.72-1.61-2.01-.17-.29-.02-.45.13-.59.13-.13.29-.34.43-.5.14-.17.19-.29.29-.48.1-.19.05-.36-.02-.5-.07-.14-.67-1.62-.92-2.22-.24-.57-.48-.5-.67-.51h-.57c-.19 0-.5.07-.76.36-.26.29-1 1-1 2.44 0 1.44 1.02 2.84 1.16 3.04.14.19 2 3.04 4.86 4.26.68.29 1.21.46 1.62.59.68.22 1.3.19 1.79.12.55-.08 1.71-.7 1.95-1.38.24-.67.24-1.24.17-1.38-.07-.12-.26-.19-.55-.34Z" />
                </svg>

                <span>01930 029495</span>
              </a>
            </li>

          </ul>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-blue-600 focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Dropdown */}
        {isOpen && (
          <ul className="md:hidden bg-white shadow-md px-6 py-4 space-y-4 text-center">
            <li><a href="#services" className="block hover:text-blue-500 transition">Procedures</a></li>
            <li><a href="#about" className="block hover:text-blue-500 transition">About</a></li>
            <li><a href="#testimonials" className="block hover:text-blue-500 transition">Testimonials</a></li>
            <li><a href="#appointment" className="block hover:text-blue-500 transition">Appointment</a></li>
            <li><a href="#contact" className="block hover:text-blue-500 transition">Contact</a></li>
          </ul>
        )}
      </nav>

      {/* Hero Section */}
      {/* Hero Section */}
      <header className="relative w-full bg-gradient-to-r from-blue-50 via-white to-blue-50 py-16 md:py-24">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 items-center gap-12 px-6">

          {/* Left Content */}
          <div className="space-y-6 text-center md:text-left animate-fadeIn">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 leading-tight">
              Dr. Md. Sumon Ali
            </h1>
            <h2 className="text-2xl md:text-3xl font-semibold text-blue-600">
              The Best Piles Doctor you can Trust
            </h2>
            <p className="text-gray-600 text-lg md:text-xl leading-relaxed text-justify">
              <span className="font-semibold text-gray-900">MBBS, BCS (Health), MS, Colorectal Surgery,
                Bangladesh Medical University (PG Hospital)</span> <br />
              Specialist Colorectal Surgeon, <br />
              Dhaka Medical College Hospital
            </p>
            <p className="text-gray-600 text-lg leading-relaxed text-justify">
              Providing advanced treatment for{" "}
              <span className="font-semibold">piles, hemorrhoids, anal fissures, fistula, colorectal cancer </span>
              and other colorectal diseases. With over{" "}
              <span className="font-semibold">7 years of experience</span>, Dr. Sumon Ali is committed to delivering
              compassionate, precise, and reliable surgical care.
            </p>
            <button
              onClick={scrollToAppointment}
              className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-8 py-3 rounded-full font-semibold hover:from-indigo-600 hover:to-blue-500 transition-all duration-500 shadow-lg hover:shadow-2xl"
            >
              Book Appointment
            </button>
          </div>

          {/* Right Doctor Image */}
          <div className="relative flex justify-center md:justify-end">
            <div className="w-72 h-72 md:w-96 md:h-96 rounded-full overflow-hidden shadow-2xl border-4 border-blue-200 bg-white">
              <img
                src={HeroImage}
                alt="Doctor"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Decorative Circle Behind */}
            <div className="absolute -z-10 w-80 h-80 md:w-[28rem] md:h-[28rem] rounded-full bg-blue-100 top-4 right-0 animate-pulse"></div>
          </div>
        </div>
      </header>




      {/* Procedures Section */}
      <section id="services" className="max-w-7xl mx-auto px-4 py-20 bg-gray-50">
        <h3 className="text-3xl font-bold text-center mb-12 text-gray-800">Treatments & Services</h3>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
          {procedures.length > 0 ? procedures.map((procedure, idx) => {
            const procName = typeof procedure === 'string' ? procedure : (procedure.name || 'Service');
            const procDesc = typeof procedure === 'string'
              ? `Expert care for ${procedure.toLowerCase()}`
              : (procedure.description || `Expert care for ${procName.toLowerCase()}`);
            const procId = typeof procedure === 'string' ? idx : (procedure.id || idx);

            return (
              <div
                key={procId}
                className="relative bg-white border-2 border-gradient-to-r border-teal-400/50 from-teal-400 via-blue-400 to-indigo-500 p-8 rounded-xl shadow-md hover:shadow-xl hover:-translate-y-2 transform transition-all duration-300 flex flex-col items-center justify-center"
              >
                <div className="bg-gradient-to-r from-teal-400 to-blue-400 text-white rounded-full w-16 h-16 flex items-center justify-center mb-4 text-2xl font-bold shadow-md">
                  {procName.charAt(0)}
                </div>
                <h4 className="font-bold text-xl text-center text-gray-800">{procName}</h4>
                <p className="text-center mt-2 text-gray-600 text-sm">
                  {procDesc}
                </p>
              </div>
            )
          }) : <p className="text-center text-gray-500 col-span-3">Loading services...</p>}
        </div>
      </section>

      {/* Appointment Section (always visible) */}
      {/* Appointment Section */}
      <section
        ref={appointmentRef}
        id="appointment"
        className="py-16 bg-gray-50"
      >
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Book an Appointment
          </h2>

          <div className="grid md:grid-cols-2 gap-10">
            {clinics.length > 0 ? clinics.map((c, i) => (
              <div key={c.id || i} className={`bg-white shadow-lg rounded-2xl p-6 border hover:shadow-xl transition ${i === 2 ? 'md:col-span-2' : ''}`}>
                <h3 className="text-xl font-semibold text-blue-700 mb-4">{c.hospitalName}</h3>
                <p className="text-gray-700 mb-1"><strong>Address:</strong> {c.address}</p>
                <p className="text-gray-700 mb-1"><strong>For Appoinment:</strong> {c.phone}</p>
                <p className="text-gray-700 mb-1"><strong>WhatsApp:</strong> {c.whatsapp}</p>
                <p className="text-gray-700 mb-1"><strong>IMO:</strong> {c.imo}</p>
                <p className="text-gray-700 mb-1"><strong>Email:</strong> {c.email || 'mdsumonalirpmc@gmail.com'}</p>
              </div>
            )) : (
              <p className="text-center text-gray-500 col-span-2">Loading clinics...</p>
            )}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="bg-gray-50 py-20">
        <div className="max-w-4xl mx-auto px-4 text-justify">
          <h3 className="text-3xl font-bold mb-6 text-center text-gray-900">
            About Dr. Md. Sumon Ali
          </h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            <span className="font-semibold text-gray-900">Dr. Md. Sumon Ali</span> is a Consultant Colorectal Surgeon with extensive expertise in laparoscopic and colorectal surgeries.
            He is a specialist in treating piles, anal fissures, fistula, colon & rectal cancer, inflammatory bowel disease (IBD), intestinal tuberculosis, and provides advanced laser treatments.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            With over <span className="font-semibold">7 years of experience</span>, Dr. Sumon Ali is committed to delivering personalized, precise, and compassionate care.
            Patients trust him for advanced colorectal treatments, meticulous surgical techniques, and dedicated attention to their overall wellbeing.
          </p>
          <p className="text-gray-700 leading-relaxed">
            He is affiliated with <span className="font-semibold">Dhaka Medical College Hospital</span> and consults at multiple hospitals and clinics across Dhaka and Natore, ensuring accessible expert care for all patients.
          </p>
        </div>
      </section>


      {/* Testimonials Section */}
      <section id="testimonials" className="max-w-4xl mx-auto px-4 py-20">
        <h3 className="text-3xl font-bold text-center mb-12">Testimonials</h3>
        {testimonials.length > 0 ? (
          <div className="bg-white shadow-lg p-8 rounded-lg text-center relative">
            <p className="text-gray-700 mb-4 italic">"{testimonials[testimonialIndex]?.content || testimonials[testimonialIndex]?.message}"</p>
            <h4 className="font-bold text-lg">- {testimonials[testimonialIndex]?.author || testimonials[testimonialIndex]?.name}</h4>
            <div className="flex justify-between mt-6">
              <button onClick={prevTestimonial} className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">
                Prev
              </button>
              <button onClick={nextTestimonial} className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">
                Next
              </button>
            </div>
          </div>
        ) : (
          <p className="text-center text-gray-500">Loading testimonials...</p>
        )}
      </section>

      {/* Contact Section */}
      <section id="contact" className="max-w-4xl mx-auto px-4 py-20">
        <h3 className="text-3xl font-bold text-center mb-8">Contact Us</h3>

        {showSuccess ? (
          <div className="bg-green-100 text-green-700 p-6 rounded-lg shadow text-center font-semibold animate-fadeIn">
            ✅ Your message has been submitted successfully. We will get back to you soon.
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="bg-white shadow-lg p-8 rounded-lg grid gap-6"
          >
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              className="border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              className="border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
            <textarea
              name="message"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              rows={5}
              className="border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition"
            >
              Send Message
            </button>
          </form>
        )}
      </section>


      {/* Footer */}
      <footer className="bg-gray-800 text-white py-6 mt-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p>&copy; 2025 Dr. MD. Sumon Ali. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
