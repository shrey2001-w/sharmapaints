"use client";

import React from "react";

const TermsAndConditions = () => {
  return (
    <section className="w-full bg-gray-50 py-16 px-4 sm:px-6 lg:px-12">
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-3xl p-8 sm:p-12">
        
        {/* Heading */}
        <div className="text-center mb-10">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900">
            Terms & Conditions
          </h1>

          <p className="mt-4 text-gray-600 text-lg">
            Welcome to Sharma Paints. Please read these terms and conditions
            carefully before using our website and services.
          </p>
        </div>

        {/* Content */}
        <div className="space-y-8 text-gray-700 leading-8">
          
          {/* Section 1 */}
          <div>
            <h2 className="text-2xl font-semibold text-black mb-3">
              1. Acceptance of Terms
            </h2>

            <p>
              By accessing and using the Sharma Paints website, you accept and
              agree to be bound by the terms and conditions mentioned here. If
              you do not agree with any part of these terms, please do not use
              our services.
            </p>
          </div>

          {/* Section 2 */}
          <div>
            <h2 className="text-2xl font-semibold text-black mb-3">
              2. Products & Services
            </h2>

            <p>
              Sharma Paints provides high-quality paints, coatings, and related
              products. Product colors and finishes shown on the website may
              vary slightly due to screen settings and lighting conditions.
            </p>
          </div>

          {/* Section 3 */}
          <div>
            <h2 className="text-2xl font-semibold text-black mb-3">
              3. Pricing & Payments
            </h2>

            <p>
              All prices listed on the website are subject to change without
              prior notice. Payments must be completed through approved payment
              methods before product delivery or service confirmation.
            </p>
          </div>

          {/* Section 4 */}
          <div>
            <h2 className="text-2xl font-semibold text-black mb-3">
              4. Delivery Policy
            </h2>

            <p>
              Delivery timelines may vary depending on location and product
              availability. Sharma Paints is not responsible for delays caused
              by unforeseen circumstances or third-party logistics providers.
            </p>
          </div>

          {/* Section 5 */}
          <div>
            <h2 className="text-2xl font-semibold text-black mb-3">
              5. Return & Refund Policy
            </h2>

            <p>
              Returns and refunds are only applicable for damaged or incorrect
              products delivered to customers. Customers must report issues
              within 48 hours of receiving the product.
            </p>
          </div>

          {/* Section 6 */}
          <div>
            <h2 className="text-2xl font-semibold text-black mb-3">
              6. Privacy & Security
            </h2>

            <p>
              We value your privacy and ensure that your personal information is
              protected. Customer data will not be shared with third parties
              without consent except where required by law.
            </p>
          </div>

          {/* Section 7 */}
          <div>
            <h2 className="text-2xl font-semibold text-black mb-3">
              7. Changes to Terms
            </h2>

            <p>
              Sharma Paints reserves the right to modify or update these terms
              at any time without prior notice. Continued use of the website
              after updates means you accept the revised terms.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 border-t pt-6 text-center text-sm text-gray-500">
          © 2026 Sharma Paints. All rights reserved.
        </div>
      </div>
    </section>
  );
};

export default TermsAndConditions;