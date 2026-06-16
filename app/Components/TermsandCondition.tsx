"use client";

import React from "react";

const TermsAndConditions = () => {
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
              Terms & Conditions
            </h1>

            <p className="mt-5 text-gray-600 text-lg max-w-3xl mx-auto leading-8">
              Welcome to Sharma Agencies. Please read these terms and
              conditions carefully before using our website and services.
            </p>
          </div>

          {/* Content */}
          <div className="space-y-8 text-gray-700 leading-8">
            
            {/* Section 1 */}
            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-6 rounded-2xl border border-blue-100">
              <h2 className="text-2xl font-bold text-[#0B4F9C] mb-3">
                1. Acceptance of Terms
              </h2>

              <p>
                By accessing and using the Sharma Agencies website, you accept
                and agree to be bound by the terms and conditions mentioned
                here. If you do not agree with any part of these terms, please
                do not use our services.
              </p>
            </div>

            {/* Section 2 */}
            <div className="bg-gradient-to-r from-orange-50 to-yellow-50 p-6 rounded-2xl border border-orange-100">
              <h2 className="text-2xl font-bold text-[#F7941D] mb-3">
                2. Products & Services
              </h2>

              <p>
                Sharma Agencies provides high-quality paints, coatings, and
                related products. Product colors and finishes shown on the
                website may vary slightly due to screen settings and lighting
                conditions.
              </p>
            </div>

            {/* Section 3 */}
            <div className="bg-gradient-to-r from-green-50 to-lime-50 p-6 rounded-2xl border border-green-100">
              <h2 className="text-2xl font-bold text-[#4CAF50] mb-3">
                3. Pricing & Payments
              </h2>

              <p>
                All prices listed on the website are subject to change without
                prior notice. Payments must be completed through approved
                payment methods before product delivery or service confirmation.
              </p>
            </div>

            {/* Section 4 */}
            <div className="bg-gradient-to-r from-cyan-50 to-sky-50 p-6 rounded-2xl border border-cyan-100">
              <h2 className="text-2xl font-bold text-[#0077C8] mb-3">
                4. Delivery Policy
              </h2>

              <p>
                Delivery timelines may vary depending on location and product
                availability. Sharma Agencies is not responsible for delays
                caused by unforeseen circumstances or third-party logistics
                providers.
              </p>
            </div>

            {/* Section 5 */}
            <div className="bg-gradient-to-r from-orange-50 to-red-50 p-6 rounded-2xl border border-orange-100">
              <h2 className="text-2xl font-bold text-[#E86A17] mb-3">
                5. Return & Refund Policy
              </h2>

              <p>
                Returns and refunds are only applicable for damaged or
                incorrect products delivered to customers. Customers must report
                issues within 48 hours of receiving the product.
              </p>
            </div>

            {/* Section 6 */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-2xl border border-blue-100">
              <h2 className="text-2xl font-bold text-[#0B4F9C] mb-3">
                6. Privacy & Security
              </h2>

              <p>
                We value your privacy and ensure that your personal information
                is protected. Customer data will not be shared with third
                parties without consent except where required by law.
              </p>
            </div>

            {/* Section 7 */}
            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-6 rounded-2xl border border-yellow-100">
              <h2 className="text-2xl font-bold text-[#F7941D] mb-3">
                7. Changes to Terms
              </h2>

              <p>
                Sharma Agencies reserves the right to modify or update these
                terms at any time without prior notice. Continued use of the
                website after updates means you accept the revised terms.
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

export default TermsAndConditions;