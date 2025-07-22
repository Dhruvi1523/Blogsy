import React from "react";
import "./about.css";

const About = () => {
  return (
    <section className="about">
      <div className="aboutContainer">
        <h2>Who We Are</h2>
        <p>
          Welcome to our MERN Stack Blogging Platform, launched with a vision to empower creators worldwide. As of July 2024, we provide a seamless space for writers, photographers, and storytellers to share their ideas with a global audience. Built using MongoDB, Express.js, React, and Node.js, our platform combines robust technology with an intuitive interface.
        </p>
        <p>
          Our mission is to inspire creativity and foster a community where every voice matters. With features like customizable posts, category tagging, and real-time updates, we make blogging accessible and engaging. Whether you're a tech enthusiast, a travel blogger, or a foodie sharing recipes, there's a place for you here.
        </p>
        <div className="aboutHighlight">
          Join us today and start creating stunning content with as much or as little control as you like—explore Basic and Creative modes to bring your vision to life!
        </div>
      </div>
    </section>
  );
};

export default About;