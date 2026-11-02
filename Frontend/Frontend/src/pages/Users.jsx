import React, { useState, useEffect } from 'react';
import {
  FiSearch,
  FiCheckCircle,
  FiAlertCircle,
  FiInfo,
  FiMail,
  FiLayers,
  FiEdit3,
  FiTrash2,
  FiPlus
} from 'react-icons/fi';
import { getAllDestinations } from '../services/destinationApi';
import { useLanguage } from '../context/LanguageContext';
import {
  getAllPassengers,
  deletePassenger,
  updatePassenger,
  savePassenger
} from '../services/userApi';
import { updateBooking, saveBooking, deleteBooking } from '../services/bookingApi';
export default function Users() {
  const { lang } = useLanguage();
  const [passengers, setPassengers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPassenger, setEditingPassenger] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [passengerToDelete, setPassengerToDelete] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const emptyPassenger = {

    name: "",
    prezime: "",
    email: "",
    phoneNumber: "",
    avatarUrl: "",
    image: null
  };
  const [destinations, setDestinations] = useState([]);
  const [newPassenger, setNewPassenger] = useState(emptyPassenger);
  const emptyBooking = {
    destinationId: "",
    packageName: "",
    status: "Pending",
    noteBs: "",
    noteEn: "",
    totalPrice: 0
  };
  const [newBooking, setNewBooking] = useState(emptyBooking);
  const handleStatusChange = (id, newStatus) => {
    setPassengers(prev =>
      prev.map(p => {
        if (p.id === id) {
          if (lang === 'bs') {
            const mapping = {
              'Plaćeno': 'Paid',
              'Djelimično': 'Partial',
              'Na čekanju': 'Pending'
            };
            return {
              ...p,
              statusBs: newStatus,
              statusEn: mapping[newStatus]
            };
          } else {
            const mapping = {
              'Paid': 'Plaćeno',
              'Partial': 'Djelimično',
              'Pending': 'Na čekanju'
            };
            return {
              ...p,
              statusEn: newStatus,
              statusBs: mapping[newStatus]
            };
          }
        }
        return p;
      })
    );
  };
  /*const handleDelete = async (id) => {
    await deletePassenger(id);
    setPassengers(prev =>
      prev.filter(p => p.id !== id)
    );
  };*/
 const handleDelete = async (id) => {
  try {
    const passenger = passengers.find(p => p.id === id);

  
    if (passenger?.bookingId) {
      await deleteBooking(passenger.bookingId);
    }

  
    await deletePassenger(id);

    setPassengers(prev =>
      prev.filter(p => p.id !== id)
    );

  } catch (error) {
    console.error("Greška prilikom brisanja putnika:", error);
  }
};
  const handleEditSave = async () => {
    console.log(editingPassenger);
    const updatedPassenger = await updatePassenger({
      id: editingPassenger.id,
      name: editingPassenger.name,
      prezime: editingPassenger.prezime,
      email: editingPassenger.email,
      avatarUrl: editingPassenger.avatar,
      phoneNumber: editingPassenger.phoneNumber
    });
    const updated = await updateBooking({
      id: editingPassenger.bookingId,
      status: editingPassenger.statusEn,
      noteEn: editingPassenger.noteEn,
      noteBs: editingPassenger.noteBs
    });
    console.log(updated);
    await loadPassengers(prev =>
      prev.map(p =>
        p.id === editingPassenger.id
          ? {
            ...p,
            name: updatedPassenger.name,
            prezime: updatedPassenger.prezime,
            email: updatedPassenger.email,
            phoneNumber: updatedPassenger.phoneNumber,
            statusEn: updated.status,
            statusBs:
              updated.status === "Paid"
                ? "Plaćeno"
                : updated.status === "Partial"
                  ? "Djelimično"
                  : "Na čekanju",
            noteEn: updated.noteEn,
            noteBs: updated.noteBs
          }
          : p
      )
    );
    setIsModalOpen(false);
    setEditingPassenger(null);
  };
  const filteredPassengers = passengers.filter(
    p =>
      p.name?.toLowerCase().includes(searchTerm.toLowerCase()) || p.prezime?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const formatPassengers = (data) => {
    const statusMapping = {
      "Paid": {
        bs: "Plaćeno",
        en: "Paid"
      },
      "Partial": {
        bs: "Djelimično",
        en: "Partial"
      },
      "Pending": {
        bs: "Na čekanju",
        en: "Pending"
      }
    };
    return data.map(p => ({
      id: p.id,
      bookingId: p.bookingId,
      name: p.name,
      prezime: p.prezime,
      email: p.email,
      phoneNumber: p.phoneNumber,
      avatar: p.avatarUrl,
      packageBs: p.packageName,
      packageEn: p.packageName,
      statusBs:
        statusMapping[p.status]?.bs || p.status,
      statusEn:
        statusMapping[p.status]?.en || p.status,
      noteBs: p.noteBs,
      noteEn: p.noteEn
    }));
  };
 const loadPassengers = async () => {
  try {
    const data = await getAllPassengers();
    const destinationsData = await getAllDestinations();

    setDestinations(destinationsData);
    setPassengers(formatPassengers(data));

  } catch (error) {
    console.log(error);
  }
};

useEffect(() => {
  loadPassengers();
}, []);
  const renderStatusIcon = status => {
    if (status === 'Plaćeno' || status === 'Paid') {
      return <FiCheckCircle className="text-green-500" size={16} />;
    }
    if (status === 'Djelimično' || status === 'Partial') {
      return <FiInfo className="text-amber-500" size={16} />;
    }
    return <FiAlertCircle className="text-red-500" size={16} />;
  };
  const handleAddPassenger = async () => {
    try {
      if (!newBooking.destinationId) {
        alert(
          lang === "bs"
            ? "Morate izabrati destinaciju"
            : "You must select destination"
        );
        return;
      }
      const formData = new FormData();
      formData.append(
        "passenger",
        new Blob(
          [
            JSON.stringify({
              name: newPassenger.name,
              prezime: newPassenger.prezime,
              email: newPassenger.email,
              phoneNumber: newPassenger.phoneNumber
            })
          ],
          {
            type: "application/json"
          }
        )
      );
      if (newPassenger.image) {
        formData.append(
          "image",
          newPassenger.image
        );
      }
      const passenger = await savePassenger(formData);
      console.log("NEW BOOKING:", newBooking);
      console.log("DESTINATION ID:", newBooking.destinationId);
      const booking = await saveBooking({
        passengerId: passenger.id,
        destinationId: Number(newBooking.destinationId),
        packageName: newBooking.packageName,
        status: newBooking.status,
        noteBs: newBooking.noteBs,
        noteEn: newBooking.noteEn
      });
      console.log("Dodani putnik:", passenger);
      console.log("Dodana rezervacija:", booking);
      const data = await getAllPassengers();
      setPassengers(formatPassengers(data));
      setIsAddModalOpen(false);
      setNewPassenger(emptyPassenger);
      setNewBooking(emptyBooking);
    } catch (error) {
      console.error(
        "Greška prilikom dodavanja:",
        error
      );
    }
  };
  return (
    <div className="space-y-6 text-left page-fade">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-customText">
          {lang === 'bs' ? 'Registar Putnika' : 'Passenger Register'}
        </h1>
        <p className="text-customMuted text-sm mt-1">
          {lang === 'bs'
            ? 'Evidencija prijavljenih klijenata, paketa aranžmana i finansijskog statusa.'
            : 'Records of registered clients, tour packages, and payment statuses.'}
        </p>
      </div>
      <hr className="border-customBorder" />
      
      <div className="flex 
                      flex-col 
                      md:flex-row 
                      md:items-center 
                      md:justify-between 
                      gap-4">
        <div className="relative w-full md:max-w-md">

          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-customMuted">
            <FiSearch size={18} />
          </span>
          <input
            type="text"
            placeholder={
              lang === "bs"
                ? "Pretraži po imenu ili emailu..."
                : "Search by name or email..."
            }
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full bg-customCard border border-customBorder rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-customPrimary text-customText transition-all"
          />
        </div>
        <button
          onClick={() => {
            setNewPassenger(emptyPassenger);
            setIsAddModalOpen(true);
          }}
          className="flex items-center justify-center gap-2 px-5 py-2.5 bg-customPrimary text-white rounded-xl hover:opacity-90 transition whitespace-nowrap"
        >
          <FiPlus size={18} />
          {lang === "bs"
            ? "Dodaj putnika"
            : "Add Passenger"}
        </button>
      </div>
      <div className="grid grid-cols-1 gap-4 md:hidden">
        {filteredPassengers.map(p => {
          const status = lang === 'bs' ? p.statusBs : p.statusEn;
          const note = lang === 'bs' ? p.noteBs : p.noteEn;
          return (
            <div
              key={p.id}
              className="bg-customCard border border-customBorder rounded-2xl p-4 shadow-sm space-y-4"
            >
              <div className="flex items-center gap-3">
                <img
                  src={
                    p.avatar?.startsWith("/")
                      ? "http://localhost:8080" + p.avatar
                      : p.avatar
                  }
                  alt={p.name}
                  className="w-12 h-12 rounded-full object-cover border border-customBorder"
                />
                <div>
                  <h3 className="font-bold text-customText">{p.name}</h3>
                  <h3 className="font-bold text-customText">{p.prezime}</h3>
                  <p className="text-xs text-customMuted flex items-center gap-1">
                    <FiMail size={12} /> {p.email}
                  </p>
                  <p className="text-xs text-customMuted flex items-center gap-1">
                    <FiMail size={12} /> {p.phoneNumber}
                  </p>
                </div>
              </div>
              <div className="text-sm text-customText flex items-center gap-2">
                <FiLayers className="text-customPrimary" />
                {lang === 'bs' ? p.packageBs : p.packageEn}
              </div>
              <div className="flex items-start gap-2 text-xs text-customMuted">
                <FiEdit3 className="text-customPrimary mt-0.5" />
                <span>{lang === 'bs' ? p.noteBs : p.noteEn}</span>
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  {renderStatusIcon(status)}
                  <span className="text-sm text-customText">{status}</span>
                </div>
                <select
                  value={status}
                  onChange={e =>
                    handleStatusChange(p.id, e.target.value)
                  }
                  className="w-full bg-customBg border border-customBorder rounded-lg px-3 py-2 text-sm text-customText"
                >
                  {lang === 'bs' ? (
                    <>
                      <option value="Plaćeno">Plaćeno</option>
                      <option value="Djelimično">Djelimično</option>
                      <option value="Na čekanju">Na čekanju</option>
                    </>
                  ) : (
                    <>
                      <option value="Paid">Paid</option>
                      <option value="Partial">Partial</option>
                      <option value="Pending">Pending</option>
                    </>
                  )}
                </select>
              </div>
            </div>
          );
        })}
      </div>
      <div className="hidden md:block bg-customCard border border-customBorder rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-customText">
            <thead className="bg-customBg/50 text-xs font-semibold text-customMuted uppercase border-b border-customBorder">
              <tr>
                <th className="px-4 lg:px-6 py-4">
                  {lang === 'bs' ? 'Putnik' : 'Passenger'}
                </th>
                <th className="px-4 lg:px-6 py-4">
                  {lang === 'bs' ? 'Aranžman / Paket' : 'Package / Tour'}
                </th>
                <th className="px-4 lg:px-6 py-4">
                  {lang === 'bs' ? 'Napomena' : 'Notes'}
                </th>
                <th className="px-4 lg:px-6 py-4">
                  {lang === 'bs' ? 'Status' : 'Status'}
                </th>
                <th>
                  {lang === 'bs' ? 'Akcije' : 'Actions'}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-customBorder">
              {filteredPassengers.map(p => {
                const status = lang === 'bs' ? p.statusBs : p.statusEn;
                const note = lang === 'bs' ? p.noteBs : p.noteEn;
                return (
                  <tr
                    key={p.id}
                    className="hover:bg-customBg/30 transition-all"
                  >
                    <td className="px-4 lg:px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={
                            p.avatar?.startsWith("/")
                              ? "http://localhost:8080" + p.avatar
                              : p.avatar
                          }
                          alt={p.name}
                          className="w-10 h-10 rounded-full object-cover border border-customBorder"
                        />
                        <div>
                          <div className="font-bold">{p.name} {p.prezime}</div>
                          <div className="text-xs text-customMuted flex items-center gap-1">
                            <FiMail size={12} /> {p.email}
                          </div>
                          <div className="text-xs text-customMuted flex items-center gap-1">phone: {p.phoneNumber}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 lg:px-6 py-4">
                      <div className="flex items-center gap-2">
                        <FiLayers className="text-customPrimary" />
                        {lang === 'bs' ? p.packageBs : p.packageEn}
                      </div>
                    </td>
                    <td className="px-4 lg:px-6 py-4 max-w-xs">
                      <div className="flex items-start gap-2 text-customMuted text-xs">
                        <FiEdit3 className="text-customPrimary mt-0.5" />
                        <span>{lang === 'bs' ? p.noteBs : p.noteEn}</span>
                      </div>
                    </td>
                    <td className="px-4 lg:px-6 py-4">
                      <div className="flex items-center gap-2">
                        {renderStatusIcon(status)}
                        <span className="text-sm text-customText">
                          {status}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 lg:px-6 py-4">
                      <button
                        onClick={() => {
                          setEditingPassenger(p);
                          setIsModalOpen(true);
                        }}
                        className="mr-2 text-blue-500"
                      >
                        <FiEdit3 />
                      </button>
                      <button
                        onClick={() => {
                          setPassengerToDelete(p);
                          setDeleteModalOpen(true);
                        }}
                        className="text-red-500"
                      >
                        <FiTrash2 />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      {deleteModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-customCard border border-customBorder rounded-2xl p-6 w-96">
            <h2 className="text-lg font-bold text-customText mb-3">
              {lang === 'bs'
                ? 'Potvrda brisanja'
                : 'Confirm delete'}
            </h2>
            <p className="text-sm text-customMuted mb-6">
              {lang === 'bs'
                ? `Da li ste sigurni da želite obrisati korisnika ${passengerToDelete?.name}?`
                : `Are you sure you want to delete ${passengerToDelete?.name}?`
              }
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setDeleteModalOpen(false)}
                className="px-4 py-2 rounded-xl border border-customBorder"
              >
                {lang === 'bs' ? 'Otkaži' : 'Cancel'}
              </button>
              <button
                onClick={async () => {
                  await handleDelete(passengerToDelete.id);
                  setDeleteModalOpen(false);
                  setPassengerToDelete(null);
                }}
                className="px-4 py-2 rounded-xl bg-red-500 text-white"
              >
                {lang === 'bs' ? 'Obriši' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
      {isModalOpen && editingPassenger && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-customCard border border-customBorder rounded-2xl p-6 w-full max-w-md">
            <h2 className="text-xl font-bold text-customText mb-5">
              {lang === 'bs'
                ? 'Izmjena korisnika'
                : 'Edit user'}
            </h2>
            <input
              value={editingPassenger.name}
              onChange={e =>
                setEditingPassenger({
                  ...editingPassenger,
                  name: e.target.value
                })
              }
              className="w-full mb-3 bg-customBg border border-customBorder rounded-xl px-4 py-2"
            />
            <input
              value={editingPassenger.prezime}
              onChange={e =>
                setEditingPassenger({
                  ...editingPassenger,
                  prezime: e.target.value
                })
              }
              className="w-full mb-3 bg-customBg border border-customBorder rounded-xl px-4 py-2"
            />
            <input
              value={editingPassenger.email}
              onChange={e =>
                setEditingPassenger({
                  ...editingPassenger,
                  email: e.target.value
                })
              }
              className="w-full mb-3 bg-customBg border border-customBorder rounded-xl px-4 py-2"
            />
            <input
              value={editingPassenger.phoneNumber}
              onChange={e =>
                setEditingPassenger({
                  ...editingPassenger,
                  phoneNumber: e.target.value
                })
              }
              className="w-full mb-3 bg-customBg border border-customBorder rounded-xl px-4 py-2"
            />
            <select
              value={
                lang === 'bs'
                  ? editingPassenger.statusBs
                  : editingPassenger.statusEn
              }
              onChange={(e) => {
                const value = e.target.value;
                if (lang === 'bs') {
                  const mapping = {
                    "Plaćeno": "Paid",
                    "Djelimično": "Partial",
                    "Na čekanju": "Pending"
                  };
                  setEditingPassenger({
                    ...editingPassenger,
                    statusBs: value,
                    statusEn: mapping[value]
                  });

                } else {
                  const mapping = {
                    "Paid": "Plaćeno",
                    "Partial": "Djelimično",
                    "Pending": "Na čekanju"
                  };
                  setEditingPassenger({
                    ...editingPassenger,
                    statusEn: value,
                    statusBs: mapping[value]
                  });
                }
              }}
              className="w-full mb-3 bg-customBg border border-customBorder rounded-xl px-4 py-2"
            >
              {lang === 'bs' ? (
                <>
                  <option value="Plaćeno">
                    Plaćeno
                  </option>
                  <option value="Djelimično">
                    Djelimično
                  </option>
                  <option value="Na čekanju">
                    Na čekanju
                  </option>
                </>
              )
                :
                (
                  <>
                    <option value="Paid">
                      Paid
                    </option>
                    <option value="Partial">
                      Partial
                    </option>
                    <option value="Pending">
                      Pending
                    </option>
                  </>
                )}
            </select>
            <textarea
              value={
                lang === 'bs'
                  ? editingPassenger.noteBs
                  : editingPassenger.noteEn
              }
              onChange={e =>
                setEditingPassenger({
                  ...editingPassenger,
                  [lang === 'bs' ? 'noteBs' : 'noteEn']: e.target.value
                })
              }
              className="
    w-full 
    h-28
    bg-customBg 
    text-customText
    placeholder:text-customMuted
    border 
    border-customBorder 
    rounded-xl 
    px-4 
    py-2
    focus:outline-none
    focus:border-customPrimary
    transition-all
  "
            />
            <div className="flex justify-end gap-3">
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  setEditingPassenger(null);
                }}
                className="px-4 py-2 border rounded-xl"
              >
                {lang === 'bs' ? 'Otkaži' : 'Cancel'}
              </button>
              <button
                onClick={handleEditSave}
                className="px-4 py-2 bg-customPrimary text-white rounded-xl"
              >
                {lang === 'bs' ? 'Sačuvaj' : 'Save'}
              </button>
            </div>
          </div>
        </div>
      )}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-customCard border border-customBorder rounded-2xl p-6 w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold text-customText mb-6">
              {lang === "bs"
                ? "Dodavanje novog putnika"
                : "Add new passenger"}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-sm font-semibold uppercase text-customText mb-4">
                  {lang === "bs"
                    ? "Podaci o putniku"
                    : "Passenger information"}
                </h3>
                <div className="space-y-3">
                  <input
                    placeholder={lang === "bs" ? "Ime" : "First name"}
                    value={newPassenger.name}
                    onChange={e =>
                      setNewPassenger({
                        ...newPassenger,
                        name: e.target.value
                      })
                    }
                    className="w-full bg-customBg border border-customBorder rounded-xl px-4 py-2" />
                  <input
                    placeholder={lang === "bs" ? "Prezime" : "Last name"}
                    value={newPassenger.prezime}
                    onChange={e =>
                      setNewPassenger({
                        ...newPassenger,
                        prezime: e.target.value
                      })
                    }
                    className="w-full bg-customBg border border-customBorder rounded-xl px-4 py-2" />
                  <input
                    placeholder="Email"
                    value={newPassenger.email}
                    onChange={e =>
                      setNewPassenger({
                        ...newPassenger,
                        email: e.target.value
                      })
                    }
                    className="w-full bg-customBg border border-customBorder rounded-xl px-4 py-2" />
                  <input
                    placeholder={lang === "bs" ? "Telefon" : "Phone"}
                    value={newPassenger.phoneNumber}
                    onChange={e =>
                      setNewPassenger({
                        ...newPassenger,
                        phoneNumber: e.target.value
                      })
                    }
                    className="w-full bg-customBg border border-customBorder rounded-xl px-4 py-2" />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={e =>
                      setNewPassenger({
                        ...newPassenger,
                        image: e.target.files[0]
                      })
                    }
                    className="w-full bg-customBg border border-customBorder rounded-xl px-4 py-2" />
                  {newPassenger.image && (
                    <img
                      src={URL.createObjectURL(newPassenger.image)}
                      className="w-20 h-20 rounded-full object-cover mt-3" />
                  )}
                </div>
              </div>
              <div>
                <h3 className="text-sm font-semibold uppercase text-customText mb-4">
                  {lang === "bs"
                    ? "Podaci o rezervaciji"
                    : "Booking information"}
                </h3>
                <div className="space-y-3">
                  <select
                    value={newBooking.destinationId}
                    onChange={e =>
                      setNewBooking({
                        ...newBooking,
                        destinationId: e.target.value
                      })
                    }
                    className="w-full bg-customBg border border-customBorder rounded-xl px-4 py-2">
                    <option value="">
                      {lang === "bs"
                        ? "Izaberite destinaciju"
                        : "Select destination"}
                    </option>
                    {destinations.map(dest => (
                      <option
                        key={dest.id}
                        value={dest.id}
                      >
                        {lang === "bs"
                          ? dest.titleBs
                          : dest.titleEn}
                      </option>
                    ))}
                  </select>
                  <input
                    placeholder={
                      lang === "bs"
                        ? "Naziv aranžmana"
                        : "Package name"
                    }
                    value={newBooking.packageName}
                    onChange={e =>
                      setNewBooking({
                        ...newBooking,
                        packageName: e.target.value
                      })
                    }
                    className="w-full bg-customBg border border-customBorder rounded-xl px-4 py-2" />
                  <select
                    value={newBooking.status}
                    onChange={e =>
                      setNewBooking({
                        ...newBooking,
                        status: e.target.value
                      })
                    }
                    className="w-full bg-customBg border border-customBorder rounded-xl px-4 py-2">
                    <option value="Paid">
                      {lang === "bs"
                        ? "Plaćeno"
                        : "Paid"}
                    </option>
                    <option value="Partial">
                      {lang === "bs"
                        ? "Djelimično"
                        : "Partial"}
                    </option>
                    <option value="Pending">
                      {lang === "bs"
                        ? "Na čekanju"
                        : "Pending"}
                    </option>
                  </select>
                  <textarea
                    placeholder={
                      lang === "bs"
                        ? "Napomena"
                        : "Notes"
                    }
                    value={
                      lang === "bs"
                        ? newBooking.noteBs
                        : newBooking.noteEn
                    }
                    onChange={e =>
                      setNewBooking({
                        ...newBooking,
                        [lang === "bs"
                          ? "noteBs"
                          : "noteEn"]: e.target.value
                      })
                    }
                    className="
    w-full 
    h-28
    bg-customBg 
    text-customText
    placeholder:text-customMuted
    border 
    border-customBorder 
    rounded-xl 
    px-4 
    py-2
    focus:outline-none
    focus:border-customPrimary
    transition-all
  "
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-8">
              <button
                onClick={() => {
                  setIsAddModalOpen(false);
                  setNewPassenger(emptyPassenger);
                }}
                className="px-4 py-2 border border-customBorder rounded-xl">
                {lang === "bs"
                  ? "Otkaži"
                  : "Cancel"}
              </button>
              <button
                onClick={handleAddPassenger}
                className="px-4 py-2 bg-customPrimary text-white rounded-xl">
                {lang === "bs"
                  ? "Dodaj"
                  : "Add"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}