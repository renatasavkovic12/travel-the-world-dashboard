import React, { useState, useEffect } from 'react';
import {
  FiStar,
  FiMapPin,
  FiCheckCircle,
  FiMaximize2,
  FiX
} from 'react-icons/fi';
import { useLanguage } from '../context/LanguageContext';
import { getAllReviews } from "../services/reviewApi";

export default function Reviews() {
  const { lang } = useLanguage();
  const [reviews, setReviews] = useState([]);
  const totalReviews = reviews.length;
  const averageRating = (reviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews).toFixed(1);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedAvatar, setSelectedAvatar] = useState(null);

  useEffect(() => {
    const loadReviews = async () => {
      try {
        const data = await getAllReviews();
        const formatted = data.map(r => ({
          id: r.id,
          author:
            r.passenger
              ? r.passenger.name + " " + r.passenger.prezime
              : "Nepoznati korisnik",
          avatar:
            r.passenger?.avatarUrl,
          tourBs:
            r.destination?.titleBs,
          tourEn:
            r.destination?.titleEn,
          rating:
            r.rating,
          textBs:
            r.text,
          textEn:
            r.text,
          date:
            r.date,
          travelImage:
            r.images?.[0]?.imageUrl || null
        }));
        setReviews(formatted);
      } catch (error) {
        console.log(error);
      }
    };
    loadReviews();
  }, []);

  return (
    <div className="space-y-6 text-left page-fade">

      <div className="flex flex-col md:flex-row md:items-center md:justify-between border-b border-customBorder pb-5 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-customText">
            {lang === 'bs' ? 'Recenzije i Utisci' : 'Guest Reviews & Feed'}
          </h1>
          <p className="text-customMuted text-sm mt-1">
            {lang === 'bs'
              ? 'Uvid u zadovoljstvo klijenata i fotografije sa terena.'
              : 'Overview of customer satisfaction and field photos.'}
          </p>
        </div>

        <div className="flex gap-4">
          <div className="bg-customCard border border-customBorder px-4 py-2.5 rounded-xl shadow-sm text-center min-w-[100px]">
            <div className="text-xs font-semibold text-customMuted uppercase">
              {lang === 'bs' ? 'Ukupno' : 'Total'}
            </div>
            <div className="text-xl font-bold text-customPrimary mt-0.5">
              {totalReviews}
            </div>
          </div>

          <div className="bg-customCard border border-customBorder px-4 py-2.5 rounded-xl shadow-sm text-center min-w-[100px]">
            <div className="text-xs font-semibold text-customMuted uppercase">
              {lang === 'bs' ? 'Prosjek' : 'Average'}
            </div>

            <div className="text-xl font-bold text-amber-500 mt-0.5 flex items-center justify-center gap-1">
              {averageRating}
              <FiStar
                className="text-amber-500"
                fill="currentColor"
                size={16}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="columns-1 md:columns-2 gap-6 space-y-6 [column-fill:_balance]">

        {reviews.map((review) => (
          <div
            key={review.id}
            className="break-inside-avoid bg-customCard border border-customBorder rounded-2xl shadow-sm p-5 flex flex-col space-y-4 hover:shadow-md transition-all duration-300 inline-block w-full"
          >

            <div className="flex items-start justify-between">

              <div className="flex items-center gap-3">

                {/* AVATAR PUTNIKA */}
                <div
                  className="
                    group relative
                    w-11 h-11 min-w-[44px] min-h-[44px]
                    rounded-full
                    overflow-hidden
                    border-2 border-customBorder
                    cursor-pointer
                    transition-all duration-500
                    hover:scale-110
                    hover:border-customPrimary
                    hover:shadow-[0_0_20px_rgba(59,130,246,0.4)]
                  "
                  onClick={() => review.avatar && setSelectedAvatar(review.avatar)}
                >
                  <img
                    src={review.avatar}
                    alt={review.author}
                    className="
                      w-full h-full object-cover
                      transition-all duration-700 ease-out
                      group-hover:scale-125
                      group-hover:rotate-3
                    "
                  />

                  <div
                    className="
                      absolute inset-0
                      rounded-full
                      border-2 border-white/0
                      group-hover:border-white/40
                      transition-all duration-500
                    "
                  />
                </div>

                <div>
                  <h4 className="font-bold text-customText text-sm flex items-center gap-1.5">
                    {review.author}

                    <span className="text-green-500 text-xs">
                      <FiCheckCircle
                        fill="currentColor"
                        className="text-white dark:text-slate-900"
                      />
                    </span>
                  </h4>

                  <p className="text-xs text-customMuted">
                    {review.username}
                  </p>
                </div>

              </div>

              <div className="text-right">

                <div className="flex gap-0.5 text-amber-500 justify-end">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <FiStar
                      key={i}
                      size={13}
                      fill={i < review.rating ? 'currentColor' : 'none'}
                      className={
                        i < review.rating
                          ? 'text-amber-500'
                          : 'text-customBorder'
                      }
                    />
                  ))}
                </div>

                <p className="text-[10px] text-customMuted mt-1">
                  {review.date}
                </p>

              </div>

            </div>

            <div className="inline-flex items-center gap-1.5 bg-customBg text-customPrimary text-xs font-semibold px-3 py-1.5 rounded-xl w-fit border border-customBorder">
              <FiMapPin size={13} />
              {lang === 'bs' ? review.tourBs : review.tourEn}
            </div>

            <p className="text-xs text-customText leading-relaxed font-normal">
              "{lang === 'bs' ? review.textBs : review.textEn}"
            </p>

            {/* FOTOGRAFIJA RECENZIJE */}
            {review.travelImage && (
              <div
                className="group relative rounded-xl overflow-hidden h-44 w-full border border-customBorder bg-customBg cursor-pointer"
                onClick={() => setSelectedImage(review.travelImage)}
              >
                <img
                  src={review.travelImage}
                  alt="Travel destination"
                  className="
                    w-full h-full object-cover
                    transition-all duration-700 ease-out
                    group-hover:scale-110
                    group-hover:brightness-75
                  "
                  loading="lazy"
                />

                <div
                  className="
                    absolute inset-0
                    flex items-center justify-center
                    bg-black/10
                    group-hover:bg-black/35
                    transition-all duration-500
                  "
                >
                  <div
                    className="
                      flex items-center gap-2
                      px-4 py-2
                      rounded-full
                      bg-white/15
                      backdrop-blur-md
                      border border-white/30
                      text-white
                      text-xs font-semibold
                      opacity-0
                      translate-y-3
                      group-hover:opacity-100
                      group-hover:translate-y-0
                      transition-all duration-500
                      shadow-lg
                    "
                  >
                    <FiMaximize2 size={14} />
                    {lang === 'bs'
                      ? 'Pogledaj fotografiju'
                      : 'View photo'}
                  </div>
                </div>
              </div>
            )}

            <div className="pt-3 border-t border-customBorder flex items-center justify-between text-[10px] text-customMuted font-medium">
              <span className="bg-green-500/10 text-green-600 px-2 py-0.5 rounded-md">
                ✓ {lang === 'bs'
                  ? 'Putovanje realizovano'
                  : 'Trip Completed'}
              </span>

              <span>Admin Verified</span>
            </div>

          </div>
        ))}

      </div>

      {/* MODAL ZA FOTOGRAFIJU RECENZIJE */}
      {selectedImage && (
        <div
          className="
            fixed inset-0 z-[100]
            bg-black/75
            backdrop-blur-xl
            flex items-center justify-center
            p-4 md:p-8
            animate-[fadeIn_.3s_ease-out]
          "
          onClick={() => setSelectedImage(null)}
        >

          <button
            onClick={() => setSelectedImage(null)}
            className="
              absolute top-5 right-5 md:top-8 md:right-8
              w-10 h-10
              rounded-full
              bg-white/10
              hover:bg-white/20
              backdrop-blur-md
              border border-white/20
              text-white
              flex items-center justify-center
              transition-all duration-300
              hover:rotate-90
              hover:scale-110
              z-10
            "
            aria-label="Close"
          >
            <FiX size={20} />
          </button>

          <div
            className="
              relative
              max-w-[92vw]
              max-h-[90vh]
              animate-[imageZoom_.45s_cubic-bezier(.16,1,.3,1)]
            "
            onClick={(e) => e.stopPropagation()}
          >

            <div
              className="
                absolute -inset-3
                rounded-3xl
                bg-white/10
                blur-2xl
                opacity-60
              "
            />

            <img
              src={selectedImage}
              alt="Travel destination"
              className="
                relative
                max-w-[92vw]
                max-h-[88vh]
                object-contain
                rounded-2xl
                shadow-[0_25px_80px_rgba(0,0,0,0.55)]
                border border-white/15
                transition-transform duration-500
                hover:scale-[1.01]
              "
            />

          </div>

        </div>
      )}

      {/* MODAL ZA AVATAR PUTNIKA */}
      {selectedAvatar && (
        <div
          className="
            fixed inset-0 z-[110]
            flex items-center justify-center
            bg-black/60
            backdrop-blur-lg
            animate-[fadeIn_.3s_ease-out]
            p-6
          "
          onClick={() => setSelectedAvatar(null)}
        >

          <div
            className="
              relative
              animate-[avatarPop_.55s_cubic-bezier(.34,1.56,.64,1)]
            "
            onClick={(e) => e.stopPropagation()}
          >

            {/* Glow */}
            <div
              className="
                absolute inset-[-20px]
                rounded-full
                bg-customPrimary/20
                blur-2xl
                opacity-70
                animate-pulse
              "
            />

            {/* Avatar */}
            <img
              src={selectedAvatar}
              alt="Passenger profile"
              className="
                relative
                w-64 h-64
                md:w-80 md:h-80
                rounded-full
                object-cover
                border-4 border-white/20
                shadow-[0_20px_70px_rgba(0,0,0,0.5)]
              "
            />

            {/* Close button */}
            <button
              onClick={() => setSelectedAvatar(null)}
              className="
                absolute
                top-2 right-2
                md:-top-2 md:-right-2
                w-9 h-9
                rounded-full
                bg-black/50
                backdrop-blur-md
                border border-white/20
                text-white
                flex items-center justify-center
                transition-all duration-300
                hover:scale-110
                hover:rotate-90
                hover:bg-black/70
              "
              aria-label="Close"
            >
              <FiX size={17} />
            </button>

          </div>

        </div>
      )}

    </div>
  );
}