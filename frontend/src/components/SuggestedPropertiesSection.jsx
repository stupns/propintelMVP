import React, {useState} from 'react';
import {Swiper, SwiperSlide} from 'swiper/react';
import {EffectCoverflow, Pagination} from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

const SuggestedPropertiesSection = ({properties = []}) => {
    const [activeIndex, setActiveIndex] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [selectedProperty, setSelectedProperty] = useState(null);
    if (!Array.isArray(properties)) return null;

    return (
        <div className="w-full max-w-7xl mx-auto px-4 py-16 text-rich-black">
            <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center bg-gradient-to-r from-amber-200 via-green-200 to-emerald-400 bg-clip-text text-transparent">
                Suggested Properties
            </h2>

            <Swiper
                effect="coverflow"
                grabCursor
                centeredSlides
                slidesPerView="auto"
                coverflowEffect={{
                    rotate: 30,
                    stretch: 0,
                    depth: 150,
                    modifier: 1.5,
                    slideShadows: true,
                }}
                pagination={{clickable: true}}
                modules={[EffectCoverflow, Pagination]}
                className="w-full max-w-6xl"
            >
                {properties.map((property, index) => (
                    <SwiperSlide
                        key={index}
                        onClick={() => setActiveIndex(index === activeIndex ? null : index)}
                        className="cursor-pointer p-[2px] rounded-2xl bg-gradient-to-r from-amber-200 via-green-200 to-emerald-400 w-[300px] md:w-[360px] lg:w-[400px]"
                    >
                        {activeIndex === index ? (
                            <div
                                className="bg-rich-black rounded-2xl overflow-hidden shadow-xl flex flex-col p-6 space-y-4">
                                <div className="space-y-4">
                                    <h3 className="text-xl text-brand-mint font-semibold">Property Images</h3>
                                    <div className="flex flex-wrap gap-4 rounded-md pb-2">
                                        {property.images && property.images.length > 0 ? (
                                            property.images.map((img, idx) => (
                                                <img
                                                    key={idx}
                                                    src={img}
                                                    alt={`Image ${idx + 1}`}
                                                    className="w-64 h-40 object-cover rounded shadow-lg border border-brand-seafoam cursor-pointer"
                                                    onClick={() => window.open(img, '_blank')}
                                                />
                                            ))
                                        ) : (
                                            <p className="text-white text-sm">No images available.</p>
                                        )}
                                    </div>
                                </div>
                                <h3 className="text-2xl font-bold text-emerald-400">{property.city || '—'}, {property.country || '—'}</h3>
                                {Array.isArray(property.long_description_blocks) ? (
                                    <div className="text-white text-sm space-y-4 leading-relaxed">
                                        {property.long_description_blocks.map((block, idx) => (
                                            <div key={idx}>
                                                {block.title && (
                                                    <h3 className="text-lg font-semibold text-brand-mint mt-4 mb-2">
                                                        {block.title}
                                                    </h3>
                                                )}
                                                {block.points && Array.isArray(block.points) && (
                                                    <ul className="list-disc ml-5 space-y-1">
                                                        {block.points.map((point, i) => (
                                                            <li key={i}>{point}</li>
                                                        ))}
                                                    </ul>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                ) : property.long_description ? (
                                    <div
                                        className="[&h3]:text-lg [&h3]:font-semibold [&h3]:text-brand-mint [&h3]:mt-4 [&h3]:mb-2
                                               [&ul]:list-disc [&ul]:ml-5 [&ul]:space-y-1 [&p]:mb-2 text-white text-sm leading-relaxed"
                                        dangerouslySetInnerHTML={{ __html: property.long_description }}
                                    />
                                ) : null}
                                <div className="flex flex-col space-y-2">
                                    <a
                                        href={property.document}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-brand-seafoam underline hover:text-brand-mint"
                                    >
                                        View Pricing Document
                                    </a>
                                    <button
                                        onClick={() => {
                                            setSelectedProperty(property);
                                            setShowModal(true);
                                        }}
                                        className="px-4 py-2 rounded bg-brand-mint text-black font-semibold hover:bg-brand-seafoam transition"
                                    >
                                        Contact the Developer
                                    </button>
                                    <button
                                        onClick={() => setActiveIndex(null)}
                                        className="mt-2 bg-brand-mint hover:bg-brand-seafoam text-black font-semibold px-4 py-2 rounded transition"
                                    >
                                        Close
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div
                                className="bg-rich-black rounded-2xl overflow-hidden shadow-xl transition-all duration-300 hover:scale-[1.03] flex flex-col">
                                <img
                                    src={property.images?.[0]} alt="Primary property image"
                                    alt={property.title || property.summary || 'Property'}
                                    className="w-full h-56 object-cover"
                                />
                                <div className="px-6 py-5 text-center space-y-2">
                                    <p className="text-emerald-400 text-xl font-semibold tracking-tight">
                                        £{property.price}
                                    </p>
                                    <p className="text-gold-muted text-base font-medium">
                                        {property.city || '—'}, {property.country || '—'}
                                    </p>
                                    <p className="text-white text-sm opacity-60 capitalize">
                                        {property.property_type || '—'}
                                    </p>
                                    <ul className="text-sm text-white opacity-60 mt-2 space-y-1 list-none">
                                        {property.amenities?.map((amenity, i) => (
                                            <li key={i}>✔ {amenity}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        )}
                    </SwiperSlide>
                ))}
            </Swiper>

            {properties.length === 0 && (
                <p className="text-center text-white mt-8 text-lg">
                    No properties matched your filters.
                </p>
            )}

            {showModal && selectedProperty && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md text-black">
                        <h3 className="text-lg font-semibold mb-4">Get in Touch</h3>
                        <p className="mb-2">📞 Call us: <a href="tel:+905488904444"
                                                          className="text-brand-mint font-medium">+90 548 890 44 44</a>
                        </p>
                        <p className="mb-4">
                            Or email us at <a href="mailto:info@theboulevardvillas.com"
                                              className="text-brand-mint font-medium">info@theboulevardvillas.com</a> with
                            the following:
                        </p>
                        <pre className="text-sm bg-gray-100 p-3 rounded whitespace-pre-wrap">
The client is interested in:

Property: {selectedProperty.summary || selectedProperty.title}
                            City: {selectedProperty.city}
                            Type: {selectedProperty.property_type}
                            Selected amenities: {selectedProperty.amenities?.join(', ')}

                            Documents have been provided to the client

The client wishes to get in touch
            </pre>
                        <div className="mt-4 flex justify-between">
                            <button
                                onClick={() => {
                                    const mailBody = `The client is interested in:

Property: ${selectedProperty.summary || selectedProperty.title}
City: ${selectedProperty.city}
Type: ${selectedProperty.property_type}
Selected amenities: ${selectedProperty.amenities?.join(', ')}

Documents have been provided to the client

The client wishes to get in touch`;
                                    window.location.href = `mailto:info@theboulevardvillas.com?subject=Client Interest&body=${encodeURIComponent(mailBody)}`;
                                }}
                                className="px-4 py-2 bg-brand-seafoam hover:bg-brand-mint text-black font-semibold rounded transition"
                            >
                                Send Email
                            </button>
                            <button
                                onClick={() => setShowModal(false)}
                                className="px-4 py-2 bg-brand-mint hover:bg-brand-seafoam text-black font-semibold rounded transition"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <style jsx global>{`
                .swiper-pagination-bullet.swiper-pagination-bullet-active {
                    background-color: transparent !important;
                    opacity: 0 !important;
                }
            `}</style>
        </div>
    );
};

export default SuggestedPropertiesSection;