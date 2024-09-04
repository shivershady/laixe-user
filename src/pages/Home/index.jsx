import AboutSection from './components/AboutSection';
import ContactSection from './components/ContactSection';
import CourseList from './components/CourseList';
import HeroSection from './components/HeroSection';
import React from 'react';

function Home() {
    return (
        <>
            <HeroSection />
            <CourseList />
            <AboutSection />
            <ContactSection />
        </>
    );
}

export default Home;