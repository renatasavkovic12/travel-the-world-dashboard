import React, { useState } from 'react';
import { FiMapPin, FiUsers, FiAlertTriangle, FiCheckCircle, FiArrowLeft, FiGlobe, FiEdit, FiX, FiCalendar, FiClock, FiPlus } from 'react-icons/fi';
import { useLanguage } from '../context/LanguageContext';
import { useEffect } from "react";
import { getAllDestinations } from "../services/destinationApi";
import { getAllContinents } from "../services/continentApi";
import { saveContinent, deleteContinent } from "../services/continentApi";
import {
  saveDestination,
  updateDestination,
  deleteDestination
} from "../services/destinationApi";
const emptyTourTemplate = {
  titleBs: '',
  titleEn: '',

  continent: {
    id: null
  },

  typeBs: '',
  typeEn: '',

  totalSeats: 20,
  bookedSeats: 0,

  price: 0,

  departure: '',
  returnDate: '',

  nights: 1,

  itineraryBs: '',
  itineraryEn: '',

  images: []
};
const emptyContinentTemplate = {
  nameBs: '',
  nameEn: '',
  descBs: '',
  descEn: '',
  imageUrl: ''
};
export default function Destinations() {
  const { t, lang } = useLanguage();
  const [destinationsData, setDestinationsData] = useState([]);
  const [selectedContinent, setSelectedContinent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTarget, setEditingTarget] = useState(null);
  const [modalMode, setModalMode] = useState('edit');
  const [modalType, setModalType] = useState('destination');
  const [continents, setContinents] = useState([]);
  const filteredDestinations = destinationsData.filter(dest => dest.continent.id === selectedContinent);
  const currentContinent = continents.find(c => c.id === selectedContinent);
  const currentContinentName = currentContinent ? (lang === 'bs' ? currentContinent.nameBs : currentContinent.nameEn) : '';
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [continentToDelete, setContinentToDelete] = useState(null);
  const [hoveredContinent, setHoveredContinent] = useState(null);
  const [hoveredOffer, setHoveredOffer] = useState(null);
  const getContinentCount = (continentId) => {
    return destinationsData.filter(
      d => d.continent.id === continentId
    ).length;
  };
  const getContinentDestinations = (continentId) => {
    return destinationsData.filter(
      d => d.continent.id === continentId
    );
  };
  const handleCreateContinentClick = () => {
    setModalType('continent');
    setModalMode('create');
    setEditingTarget({
      ...emptyContinentTemplate
    });
    setIsModalOpen(true);
  };
  const handleDeleteContinent = async () => {
    if (!continentToDelete)
      return;
    await deleteContinent(continentToDelete.id);
    await loadContinents();
    setContinentToDelete(null);
  };
  const handleSaveContinent = async () => {
    await saveContinent(editingTarget);
    await loadContinents();
    setIsModalOpen(false);
  };
  const handleEditClick = (tour) => {
    setModalMode('edit');
    setEditingTarget({
      ...tour,
      continent: {
        id: tour.continent.id
      },
      images: tour.images || []
    });
    setIsModalOpen(true);
  };
  const openDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };
  const confirmDelete = async () => {
    try {
      await deleteDestination(editingTarget.id);
      await loadDestinations();
      setIsDeleteModalOpen(false);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Greška kod brisanja:", error);
    }
  };
  const handleCreateClick = () => {
    setModalType('destination');
    setModalMode('create');
    setEditingTarget({
      ...emptyTourTemplate,
      continent: {
        id: selectedContinent
      }
    });
    setIsModalOpen(true);
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditingTarget(prev => ({ ...prev, [name]: value }));
  };
  const handleSaveChanges = async (e) => {
    e.preventDefault();
    if (modalType === "continent") {
      const formData = new FormData();
      const continentData = {
        nameBs: editingTarget.nameBs,
        nameEn: editingTarget.nameEn,
        descriptionBs: editingTarget.descriptionBs,
        descriptionEn: editingTarget.descriptionEn,
        id: editingTarget.id
      };
      formData.append(
        "continent",
        new Blob(
          [JSON.stringify(continentData)],
          {
            type: "application/json"
          }
        )
      );
      if (editingTarget.imageFile) {
        formData.append(
          "image",
          editingTarget.imageFile
        );
      }
      await saveContinent(formData);
      await loadContinents();
    } else {
      const destination = {
        ...editingTarget,
        continent: {
          id: editingTarget.continent.id
        }
      };
      if (modalMode === "edit") {
        await updateDestination(destination);
      } else {
        await saveDestination(destination);
      }
      await loadDestinations();
    }
    setIsModalOpen(false);
  };
  useEffect(() => {
    loadContinents();
    loadDestinations();
  }, []);
  const loadDestinations = async () => {
    try {
      const data = await getAllDestinations();
      setDestinationsData(data);
    } catch (error) {
      console.log("ERROR:", error);
    }
  };
  const loadContinents = async () => {
    try {
      const data = await getAllContinents();
      setContinents(data);
    } catch (error) {
      console.log("ERROR:", error);
    }
  };
  return (
    <div className="space-y-6 text-left page-fade relative">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-customText">
            {selectedContinent ? `${t('toursInContinent') || 'Aranžmani: '}${currentContinentName}` : t('regionsTitle') || 'Kontinentalne Regije'}
          </h1>
          <p className="text-customMuted text-sm mt-1">
            {selectedContinent ? `${t('toursSubtitle') || 'Pregled aktivnih putovanja za regiju '}${currentContinentName}.` : t('regionsSubtitle') || 'Izaberite kontinent za menadžment i pregled aktivnih turističkih programa.'}
          </p>
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="flex items-center gap-3 w-full sm:w-auto">
            {!selectedContinent ? (
              <button
                onClick={handleCreateContinentClick}
                className="flex items-center justify-center gap-2 bg-customPrimary hover:bg-opacity-90 text-customText px-4 py-2.5 rounded-xl font-medium shadow-md transition-all text-sm w-full sm:w-auto"
              >
                <FiPlus size={18} />
                {lang === 'bs' ? 'Dodaj kontinent' : 'Add Continent'}
              </button>
            ) : (
              <button
                onClick={handleCreateClick}
                className="flex items-center justify-center gap-2 bg-customPrimary hover:bg-opacity-90 text-customText px-4 py-2.5 rounded-xl font-medium shadow-md transition-all text-sm w-full sm:w-auto"
              >
                <FiPlus size={18} />
                {lang === 'bs' ? 'Dodaj novu ponudu' : 'Add New Offer'}
              </button>
            )}
            {selectedContinent && (
              <button
                onClick={() => setSelectedContinent(null)}
                className="flex items-center justify-center gap-2 bg-customBg hover:bg-customBorder text-customText border border-customBorder px-4 py-2.5 rounded-xl font-medium shadow-sm transition-all text-sm w-full sm:w-auto"
              >
                <FiArrowLeft size={16} />
                {t('backBtn') || 'Nazad'}
              </button>
            )}
          </div>
        </div>
      </div>
      <hr className="border-customBorder" />
      {!selectedContinent && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {continents.map((continent) => (
            <div
              key={continent.id}
              onClick={() => setSelectedContinent(continent.id)}
              onMouseEnter={() => setHoveredContinent(continent.id)}
              onMouseLeave={() => setHoveredContinent(null)}
              className={`group relative bg-customCard rounded-2xl border border-customBorder shadow-sm overflow-visible cursor-pointer transition-all duration-500
      ${hoveredContinent === continent.id
                  ? "z-50 scale-[1.02] shadow-2xl"
                  : "z-0"
                }
    `}
            >
              <div className="p-4 flex justify-between items-center relative z-20">
                <span className="text-customMuted text-xs font-medium line-clamp-2">
                  {lang === "bs"
                    ? continent.descriptionBs
                    : continent.descriptionEn}
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setContinentToDelete(continent);
                  }}
                  className="bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded-lg text-xs"
                >
                  {t("deleteBtn")}
                </button>
              </div>
              <div className="relative h-52 overflow-visible">
                <img
                  src={
                    continent.imageUrl
                      ? (
                        continent.imageUrl.startsWith("/uploads")
                          ? `http://localhost:8080${continent.imageUrl}`
                          : continent.imageUrl
                      )
                      : "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=500"
                  }
                  alt={lang === "bs" ? continent.nameBs : continent.nameEn}

                  className={`w-full h-full 
                    object-cover 
                    rounded-b-2xl 
                    transition-all 
                    duration-700
                    ${hoveredContinent === continent.id
                      ? "scale-110 blur-sm brightness-50"
                      : ""
                    }`}
                    
                />
                <div
                  className="absolute inset-0 rounded-b-2xl bg-gradient-to-t from-black/70 via-black/20 to-transparent
        "
                />
                <div className="absolute bottom-4 left-4 z-20">
                  <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                    <FiGlobe className="text-customPrimary" />
                    {lang === "bs"
                      ? continent.nameBs
                      : continent.nameEn}
                  </h3>
                </div>
                <div
                  className={`absolute left-4 right-4 top-4 rounded-2xl bg-slate-900/95 backdrop-blur-xl border border-white/20 p-5 shadow-2xl transition-all duration-500 ease-out origin-top z-[100]
          ${hoveredContinent === continent.id
                      ? "opacity-100 translate-y-0 scale-100"
                      : "opacity-0 pointer-events-none -translate-y-6 scale-95"
                    }
        `}
                >
                  <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
                    <FiGlobe className="text-customPrimary" />
                    {lang === "bs"
                      ? "Dostupni aranžmani"
                      : "Available offers"}
                  </h4>
                  <div className="space-y-3">
                    {
                      getContinentDestinations(continent.id)
                        .slice(0, 4)
                        .map((tour) => (
                          <div
                            key={tour.id}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleEditClick(tour);
                            }}
                            className=" bg-white/10 hover:bg-white/20 rounded-xl px-4 py-3 text-white cursor-pointer transition-all flex justify-between items-center hover:scale-[1.02]"
                          >
                            <span
                              className="font-medium text-sm truncate max-w-[70%]"
                            >
                              {lang === "bs"
                                ? tour.titleBs
                                : tour.titleEn}
                            </span>
                            <span
                              className="text-customPrimary font-bold  text-sm  whitespace-nowrap  ml-3"
                            >
                              {tour.price}
                            </span>
                          </div>
                        ))
                    }
                  </div>
                  <p className="  mt-4 text-xs text-white/60 text-center">
                    {lang === "bs"
                      ? "Kliknite za više detalja"
                      : "Click for details"}
                  </p>
                </div>
              </div>
              <div className="p-4">
                <p className="text-sm text-customMuted line-clamp-2">
                  {lang === "bs"
                    ? continent.descBs
                    : continent.descEn}
                </p>
                <div
                  className=" flex justify-between items-center  pt-3 mt-3 border-t  border-customBorder text-xs"
                >
                  <span className="text-customPrimary font-semibold">
                    {lang === "bs"
                      ? "Aktivni programi"
                      : "Active tours"}
                  </span>
                  <span
                    className=" bg-customPrimary/10 text-customPrimary  px-3  py-1  rounded-full"
                  >
                    {getContinentCount(continent.id)}
                    {" "}
                    {lang === "bs"
                      ? "ture"
                      : "tours"}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {selectedContinent && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDestinations.map((dest) => {
            const occupancyRate = Math.round((dest.bookedSeats / dest.totalSeats) * 100);
            const availableSeats = dest.totalSeats - dest.bookedSeats;
            return (
              <div key={dest.id} className="bg-customCard rounded-2xl border border-customBorder shadow-sm overflow-hidden flex flex-col justify-between page-fade">
                <div className="relative h-48 w-full">
                  <img
                    src={
                      dest.images?.[0]?.imageUrl
                        ? (
                          dest.images[0].imageUrl.startsWith("/uploads")
                            ? `http://localhost:8080${dest.images[0].imageUrl}`
                            : dest.images[0].imageUrl
                        )
                        : 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=500'
                    }
                    alt={lang === 'bs' ? dest.titleBs : dest.titleEn}
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute top-3 left-3 bg-white/90 dark:bg-slate-900/90 text-customText text-xs font-semibold px-2.5 py-1 rounded-full shadow-sm">
                    {lang === 'bs' ? dest.typeBs : dest.typeEn}
                  </span>
                  <span className="absolute bottom-3 right-3 bg-customPrimary text-white text-sm font-bold px-3 py-1 rounded-xl shadow-md">
                    {dest.price}
                  </span>
                </div>
                <div className="p-5 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-3">
                    <h3 className="text-xl font-bold text-customText flex items-center gap-1.5">
                      <FiMapPin className="text-customPrimary shrink-0" size={18} />
                      {lang === 'bs' ? dest.titleBs : dest.titleEn}
                    </h3>
                    <div className="bg-customBg/50 p-2.5 rounded-xl border border-customBorder space-y-1.5 text-xs text-customMuted">
                      <div className="flex items-center gap-2"><FiCalendar size={14} className="text-customPrimary" /> <span>{lang === 'bs' ? 'Polazak:' : 'Departure:'} <strong>{dest.departure}</strong></span></div>
                      <div className="flex items-center gap-2"><FiClock size={14} className="text-customPrimary" /> <span>{lang === 'bs' ? 'Trajanje:' : 'Duration:'} <strong>{dest.nights} {lang === 'bs' ? 'noćenja' : 'nights'}</strong></span></div>
                    </div>
                    <div className="flex justify-between text-sm pt-1 text-customMuted">
                      <span className="flex items-center gap-1"><FiUsers size={16} /> {t('booked') || 'Zauzeto'}: <strong>{dest.bookedSeats}</strong></span>
                      <span>{t('capacity') || 'Kapacitet'}: <strong>{dest.totalSeats}</strong></span>
                    </div>
                    <div className="mt-2">
                      <div className="w-full bg-customBg rounded-full h-2.5 overflow-hidden border border-customBorder">
                        <div className={`h-full rounded-full transition-all duration-500 ${occupancyRate >= 90 ? 'bg-red-500' : occupancyRate >= 70 ? 'bg-amber-500' : 'bg-green-500'}`} style={{ width: `${occupancyRate}%` }}></div>
                      </div>
                      <div className="flex justify-between items-center mt-1.5 text-xs">
                        <span className="text-customMuted">{t('occupancy') || 'Popunjenost'}: {occupancyRate}%</span>
                        {availableSeats === 0 ? (
                          <span className="text-red-500 font-semibold flex items-center gap-1"><FiAlertTriangle /> {t('soldOut') || 'Rasprodato'}</span>
                        ) : availableSeats <= 5 ? (
                          <span className="text-amber-500 font-semibold flex items-center gap-1"><FiAlertTriangle /> {t('onlyFewSeats') ? t('onlyFewSeats').replace('{seats}', availableSeats) : `Samo još ${availableSeats} mjesta`}</span>
                        ) : (
                          <span className="text-green-500 font-semibold flex items-center gap-1"><FiCheckCircle /> {t('freeSeats') ? t('freeSeats').replace('{seats}', availableSeats) : `Slobodno ${availableSeats} mjesta`}</span>
                        )}
                      </div>
                    </div>
                  </div>
                  <button onClick={() => handleEditClick(dest)} className="w-full mt-4 bg-customPrimary/10 hover:bg-customPrimary hover:text-white border border-customPrimary/20 text-customPrimary text-sm font-medium py-2.5 rounded-xl transition-all flex items-center justify-center gap-2">
                    <FiEdit size={16} /> {t('editTour') || 'Uredi aranžman'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm page-fade">
          <div className="bg-customCard border border-customBorder rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-5 border-b border-customBorder flex justify-between items-center bg-customBg/50">
              <div className="flex items-center gap-2">
                <FiPlus className="text-customPrimary" size={20} />
                <h2 className="text-xl font-bold text-customText">
                  {
                    modalType === "continent"
                      ? (
                        modalMode === "edit"
                          ? `Uredi: ${editingTarget.nameBs}`
                          : lang === "bs"
                            ? "Kreiraj novi kontinent"
                            : "Create New Continent"
                      )
                      : (
                        modalMode === "edit"
                          ? (
                            lang === "bs"
                              ? `Uredi: ${editingTarget.titleBs}`
                              : `Edit: ${editingTarget.titleEn}`
                          )
                          : (
                            lang === "bs"
                              ? "Kreiraj novu ponudu"
                              : "Create New Offer"
                          )
                      )
                  }
                </h2>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-customMuted 
                hover:text-customText 
                p-1.5 
                rounded-lg 
                hover:bg-customBg 
                transition-all">

                <FiX size={20} />
              </button>
            </div>
            {
              modalType === "continent"
                ? (
                  <form
                    onSubmit={handleSaveChanges}
                    className="p-6 space-y-4 overflow-y-auto flex-1 text-sm text-customText"
                  >
                    <div>
                      <label className="block text-xs font-semibold text-customMuted uppercase mb-1.5">
                        Naziv (Lokalni)
                      </label>
                      <input
                        type="text"
                        name="nameBs"
                        value={editingTarget.nameBs || ""}
                        onChange={handleInputChange}
                        className="w-full bg-customBg border border-customBorder rounded-xl px-4 py-2.5 text-customText"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-customMuted uppercase mb-1.5">
                        Name (English)
                      </label>
                      <input
                        type="text"
                        name="nameEn"
                        value={editingTarget.nameEn || ""}
                        onChange={handleInputChange}
                        className="w-full bg-customBg border border-customBorder rounded-xl px-4 py-2.5 text-customText"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-customMuted uppercase mb-1.5">
                        Opis (Lokalni)
                      </label>
                      <textarea
                        name="descriptionBs"
                        rows="3"
                        value={editingTarget.descriptionBs || ""}
                        onChange={handleInputChange}
                        className="w-full bg-customBg border border-customBorder rounded-xl px-4 py-2.5 text-customText resize-none"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-customMuted uppercase mb-1.5">
                        Description (English)
                      </label>
                      <textarea
                        name="descriptionEn"
                        rows="3"
                        value={editingTarget.descriptionEn || ""}
                        onChange={handleInputChange}
                        className="w-full bg-customBg border border-customBorder rounded-xl px-4 py-2.5 text-customText resize-none"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-customMuted uppercase mb-1.5">
                        Slika (Photo)
                      </label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files[0];
                          setEditingTarget(prev => ({
                            ...prev,
                            imageFile: file
                          }));
                        }}
                        className="w-full bg-customBg border border-customBorder rounded-xl px-4 py-2.5 text-customText"
                      />
                      {editingTarget.imageFile && (
                        <img
                          src={URL.createObjectURL(editingTarget.imageFile)}
                          alt="Preview"
                          className="mt-3 w-32 h-20 object-cover rounded-lg"
                        />
                      )}
                      {editingTarget.imageUrl && !editingTarget.imageFile && (
                        <img
                          src={`http://localhost:8080${editingTarget.imageUrl}`}
                          alt={editingTarget.nameBs}
                          className="mt-3 w-32 h-20 object-cover rounded-lg"
                        />
                      )}
                    </div>
                    <div className="flex justify-end gap-3 pt-4 border-t border-customBorder mt-6">
                      <button
                        type="button"
                        onClick={() => setIsModalOpen(false)}
                        className="bg-customBg hover:bg-customBorder text-customText border border-customBorder px-5 py-2.5 rounded-xl font-medium"
                      >
                        {lang === "bs" ? "Otkaži" : "Cancel"}
                      </button>
                      <button
                        type="submit"
                        className="bg-customPrimary text-white px-5 py-2.5 rounded-xl font-medium"
                      >
                        {lang === "bs"
                          ? "Kreiraj kontinent"
                          : "Create Continent"}
                      </button>
                    </div>
                  </form>
                )
                : (
                  <form
                    onSubmit={handleSaveChanges}
                    className="p-6 space-y-6 overflow-y-auto flex-1 text-sm text-customText"
                  >
                    <div className="bg-customBg/40 border border-customBorder rounded-2xl p-5 space-y-4">
                      <h3>
                        {
                          lang === "bs"
                            ? "Osnovne informacije"
                            : "Basic Information"
                        }
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-customMuted uppercase mb-1.5">
                            Naziv (Lokalni)
                          </label>
                          <input
                            type="text"
                            name="titleBs"
                            value={editingTarget.titleBs || ""}
                            onChange={handleInputChange}
                            className="w-full bg-customCard border border-customBorder rounded-xl px-4 py-2.5"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-customMuted uppercase mb-1.5">
                            Title (English)
                          </label>
                          <input
                            type="text"
                            name="titleEn"
                            value={editingTarget.titleEn || ""}
                            onChange={handleInputChange}
                            className="w-full bg-customCard border border-customBorder rounded-xl px-4 py-2.5"
                            required
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-customMuted uppercase mb-1.5">
                            Kontinent / Continent
                          </label>
                          <select
                            value={editingTarget.continent?.id || ""}
                            onChange={(e) =>
                              setEditingTarget(prev => ({
                                ...prev,
                                continent: {
                                  id: Number(e.target.value)
                                }
                              }))
                            }
                            className="w-full bg-customBg border border-customBorder rounded-xl px-4 py-2.5 text-customText"
                            required
                          >
                            <option value="">
                              {lang === "bs" ? "Izaberite kontinent" : "Choose continent"}
                            </option>
                            {continents.map((continent) => (
                              <option
                                key={continent.id}
                                value={continent.id}
                              >
                                {
                                  lang === "bs"
                                    ? continent.nameBs
                                    : continent.nameEn
                                }
                              </option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label>
                            {
                              lang === "bs"
                                ? "Tip aranzmana"
                                : "Type of arrangement"
                            }
                          </label>
                          <input
                            type="text"
                            name="typeBs"
                            value={editingTarget.typeBs || ""}
                            onChange={handleInputChange}
                            className="w-full bg-customCard border border-customBorder rounded-xl px-4 py-2.5"
                            required
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-customMuted uppercase mb-1.5">
                          Tour Type (English)
                        </label>
                        <input
                          type="text"
                          name="typeEn"
                          value={editingTarget.typeEn || ""}
                          onChange={handleInputChange}
                          className="w-full bg-customCard border border-customBorder rounded-xl px-4 py-2.5"
                          required
                        />
                      </div>
                    </div>
                    <div className="bg-customBg/40 border border-customBorder rounded-2xl p-5">
                      <h3>
                        {
                          lang === "bs"
                            ? "Slika aranžmana"
                            : "Offer Image"
                        }
                      </h3>
                      <label
                        className="cursor-pointer flex flex-col items-center justify-center border-2 border-dashed border-customBorder rounded-2xl h-44 hover:border-customPrimary transition overflow-hidden"
                      >
                        {
                          editingTarget.imagePreview
                            ?
                            <img
                              src={editingTarget.imagePreview}
                              className="w-full h-full object-cover"
                            />
                            :
                            <div className="text-center text-customMuted">
                              <FiPlus
                                size={30}
                                className="mx-auto mb-2 text-customPrimary"
                              />
                              <p>
                                {
                                  lang === "bs"
                                    ? "Kliknite za upload slike"
                                    : "Click to upload image"
                                }
                              </p>
                            </div>
                        }
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files[0];
                            if (file) {
                              setEditingTarget(prev => ({
                                ...prev,
                                imageFile: file,
                                imagePreview: URL.createObjectURL(file)
                              }));
                            }
                          }}
                        />
                      </label>
                      {
                        editingTarget.imageFile &&
                        <p className="text-xs text-customMuted mt-2">
                          {editingTarget.imageFile.name}
                        </p>
                      }
                    </div>
                    <div className="bg-customBg/40 border border-customBorder rounded-2xl p-5 space-y-4">
                      <h3>
                        {
                          lang === "bs"
                            ? "Detalji putovanja"
                            : "Travel Details"
                        }
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input
                          type="date"
                          name="departure"
                          value={editingTarget.departure || ""}
                          onChange={handleInputChange}
                          className="w-full bg-customCard border border-customBorder rounded-xl px-4 py-2.5"
                        />
                        <input
                          type="date"
                          name="returnDate"
                          value={editingTarget.returnDate || ""}
                          onChange={handleInputChange}
                          className="w-full bg-customCard border border-customBorder rounded-xl px-4 py-2.5"
                        />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <input
                          type="number"
                          name="nights"
                          placeholder="Noćenja"
                          value={editingTarget.nights || ""}
                          onChange={handleInputChange}
                          className="w-full bg-customCard border border-customBorder rounded-xl px-4 py-2.5"
                        />
                        <input
                          type="text"
                          name="price"
                          placeholder="$"
                          value={editingTarget.price || ""}
                          onChange={handleInputChange}
                          className="w-full bg-customCard border border-customBorder rounded-xl px-4 py-2.5"
                        />
                        <input
                          type="number"
                          name="totalSeats"
                          placeholder="Broj mjesta"
                          value={editingTarget.totalSeats || ""}
                          onChange={handleInputChange}
                          className="w-full bg-customCard border border-customBorder rounded-xl px-4 py-2.5"
                        />
                      </div>
                    </div>
                    <div className="bg-customBg/40 border border-customBorder rounded-2xl p-5">
                      <label>
                        {
                          lang === "bs"
                            ? "Plan puta"
                            : "Itinerary"
                        }
                      </label>
                      <textarea
                        name="itineraryBs"
                        rows="5"
                        value={editingTarget.itineraryBs || ""}
                        onChange={handleInputChange}
                        className="w-full bg-customCard border border-customBorder rounded-xl px-4 py-3 resize-none"
                      />
                    </div>
                    <div className="flex justify-end gap-3 pt-4 border-t border-customBorder">
                      <button
                        type="button"
                        onClick={openDeleteModal}
                      >
                        {
                          lang === "bs"
                            ? "Obriši ponudu"
                            : "Delete Offer"
                        }
                      </button>
                      <button
                        type="button"
                        onClick={() => setIsModalOpen(false)}
                      >
                        {
                          lang === "bs"
                            ? "Otkaži"
                            : "Cancel"
                        }
                      </button>
                      <button
                        type="submit"
                        className="bg-customPrimary text-white px-5 py-2.5 rounded-xl"
                      >
                        {
                          modalMode === "edit"
                            ?
                            (
                              lang === "bs"
                                ? "Sačuvaj izmjene"
                                : "Save Changes"
                            )
                            :
                            (
                              lang === "bs"
                                ? "Kreiraj ponudu"
                                : "Create Offer"
                            )
                        }
                      </button>
                    </div>
                  </form>
                )
            }
          </div>
        </div>
      )}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-customCard text-customText rounded-xl p-6 w-96 shadow-xl">
            <h2 className="text-xl font-bold mb-3">
              {
                lang === "bs"
                  ? "Brisanje ponude"
                  : "Delete Offer"
              }
            </h2>

            <p className="text-gray-600 mb-6">
              {
                lang === "bs"
                  ?
                  "Da li ste sigurni da želite obrisati ovu turističku ponudu? Ova akcija se ne može poništiti."
                  :
                  "Are you sure you want to delete this tourist offer? This action cannot be undone."
              }
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="px-4 py-2 rounded bg-gray-200"
              >
                {
                  lang === "bs"
                    ? "Otkaži"
                    : "Cancel"
                }
              </button>

              <button
                onClick={confirmDelete}
                className="px-4 py-2 rounded bg-red-600 text-white"
              >
                {
                  lang === "bs"
                    ? "Obriši"
                    : "Delete"
                }
              </button>
            </div>
          </div>
        </div>
      )}
      {continentToDelete && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-96">
            <p className="text-gray-600 mb-6">
              {
                lang === "bs"
                  ?
                  <>
                    Da li ste sigurni da želite obrisati{" "}
                    {continentToDelete.nameBs}?
                    Sve turističke ponude ovog kontinenta će biti obrisane.
                  </>
                  :
                  <>
                    Are you sure you want to delete{" "}
                    {continentToDelete.nameEn}?
                    All tourist offers from this continent will be deleted.
                  </>
              }
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setContinentToDelete(null)}
                className="px-4 py-2 bg-gray-200 rounded"
              >
                {
                  lang === "bs"
                    ? "Otkaži"
                    : "Cancel"
                }
              </button>


              <button
                onClick={handleDeleteContinent}
                className="px-4 py-2 bg-red-600 text-white rounded"
              >
                {
                  lang === "bs"
                    ? "Obriši"
                    : "Delete"
                }
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}