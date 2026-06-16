export default function SuccessPage() {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-white shadow-lg p-10 rounded-xl text-center">
          <h1 className="text-4xl font-bold text-green-600">
            Payment Successful 🎉
          </h1>
  
          <p className="mt-4 text-gray-600">
            Thank you for your order.
          </p>
        </div>
      </div>
    );
  }