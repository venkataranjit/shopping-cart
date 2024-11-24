import React from "react";

const Maps = () => {
  return (
    <>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3805.6570197822393!2d78.2854652101091!3d17.476122600174907!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcbed30f3f9184b%3A0xd972d940b47abd7b!2sNew%20Mig%20A%20Park!5e0!3m2!1sen!2sin!4v1728459570161!5m2!1sen!2sin"
        width="100%"
        style={{ border: 0, height: "calc(100vh - 64px)" }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </>
  );
};

export default Maps;
