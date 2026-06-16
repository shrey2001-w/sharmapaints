"use client";

import React from "react";

const PrivacyPolicy = () => {
  return (
    <section className="w-full py-16 px-4 sm:px-6 lg:px-12 bg-gradient-to-br from-[#fdf7ef] via-[#eef7ff] to-[#fff4e6]">
      <div className="max-w-5xl mx-auto bg-white/90 backdrop-blur-md shadow-2xl rounded-[32px] overflow-hidden border border-white">
        
        {/* Top Gradient Bar */}
        <div className="h-3 w-full bg-gradient-to-r from-[#0B4F9C] via-[#00AEEF] via-[#69BE28] to-[#F7941D]" />

        <div className="p-8 sm:p-12">
          
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <img
              src="/images/logo.png"
              alt="Sharma Agencies Logo"
              className="w-44 sm:w-52 object-contain"
            />
          </div>

          {/* Heading */}
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-[#0B4F9C] via-[#0077C8] to-[#F7941D] bg-clip-text text-transparent">
              Privacy Policy
            </h1>

            <p className="mt-5 text-gray-600 text-lg max-w-3xl mx-auto leading-8">
              Your privacy is important to Sharma Agencies. This Privacy Policy
              explains how we collect, use, and protect your personal
              information while using our website and services.
            </p>
          </div>

          {/* Content */}
          <div className="space-y-8 text-gray-700 leading-8">
            
            {/* Section 1 */}
            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-6 rounded-2xl border border-blue-100">
              <h2 className="text-2xl font-bold text-[#0B4F9C] mb-3">
                1. Information We Collect
              </h2>

              <p>
                We may collect personal information such as your name, phone
                number, email address, and delivery details when you contact us
                or place an order through our website.
              </p>
            </div>

            {/* Section 2 */}
            <div className="bg-gradient-to-r from-orange-50 to-yellow-50 p-6 rounded-2xl border border-orange-100">
              <h2 className="text-2xl font-bold text-[#F7941D] mb-3">
                2. How We Use Your Information
              </h2>

              <p>
                Your information is used to process orders, improve customer
                service, provide product updates, and enhance your overall
                experience with Sharma Agencies.
              </p>
            </div>

            {/* Section 3 */}
            <div className="bg-gradient-to-r from-green-50 to-lime-50 p-6 rounded-2xl border border-green-100">
              <h2 className="text-2xl font-bold text-[#4CAF50] mb-3">
                3. Data Protection
              </h2>

              <p>
                We implement secure measures to protect your personal data from
                unauthorized access, misuse, or disclosure. Your privacy and
                security remain our top priority.
              </p>
            </div>

            {/* Section 4 */}
            <div className="bg-gradient-to-r from-cyan-50 to-sky-50 p-6 rounded-2xl border border-cyan-100">
              <h2 className="text-2xl font-bold text-[#0077C8] mb-3">
                4. Sharing of Information
              </h2>

              <p>
                Sharma Agencies does not sell or rent customer information to
                third parties. Information may only be shared when required by
                law or for delivery and payment processing purposes.
              </p>
            </div>

            {/* Section 5 */}
            <div className="bg-gradient-to-r from-orange-50 to-red-50 p-6 rounded-2xl border border-orange-100">
              <h2 className="text-2xl font-bold text-[#E86A17] mb-3">
                5. Cookies & Tracking
              </h2>

              <p>
                Our website may use cookies to improve browsing experience,
                analyze website traffic, and personalize content for users. You
                can disable cookies through your browser settings if preferred.
              </p>
            </div>

            {/* Section 6 */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-2xl border border-blue-100">
              <h2 className="text-2xl font-bold text-[#0B4F9C] mb-3">
                6. Third-Party Links
              </h2>

              <p>
                Our website may contain links to external websites. Sharma
                Agencies is not responsible for the privacy practices or content
                of third-party websites.
              </p>
            </div>

            {/* Section 7 */}
            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-6 rounded-2xl border border-yellow-100">
              <h2 className="text-2xl font-bold text-[#F7941D] mb-3">
                7. Updates to Privacy Policy
              </h2>

              <p>
                We may update this Privacy Policy from time to time. Continued
                use of our website after changes means you accept the updated
                privacy practices.
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-14 pt-6 border-t border-gray-200 text-center">
            <p className="text-sm text-gray-500">
              © 2026 Sharma Agencies. All rights reserved.
            </p>

            <div className="mt-4 flex justify-center gap-2">
              <div className="w-5 h-5 rounded-full bg-[#0B4F9C]" />
              <div className="w-5 h-5 rounded-full bg-[#00AEEF]" />
              <div className="w-5 h-5 rounded-full bg-[#69BE28]" />
              <div className="w-5 h-5 rounded-full bg-[#F7941D]" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PrivacyPolicy;