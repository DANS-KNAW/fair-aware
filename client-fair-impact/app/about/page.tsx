import Footer from '@/components/footer/footer';
import Header from '@/components/header/header';
import React from 'react';

export default function AboutPage() {
    return (
        <>
        <Header />
        <main className="mx-auto max-w-7xl px-2 lg:px-8">
            <h1 className="text-3xl font-bold text-gray-900">About Us</h1>
            <p>
            Welcome to our application! We are dedicated to creating tools that promote fairness and awareness in impactful ways.
            </p>
            <p>
            Our mission is to empower individuals and organizations to make informed decisions and drive positive change.
            </p>
            <p>
            Thank you for visiting our platform. If you have any questions or feedback, feel free to reach out to us!
            </p>

            <h2>Contact Us</h2>
            <p>
            Mail: <a href="mailto:fair-aware@dans.knaw.nl" className="text-blue-500 underline">fair-aware@dans.knaw.nl</a>
            </p>
        </main>
        <Footer/>
        </>
    );
};

