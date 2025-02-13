// components/PricingCard.tsx
import { Star, Check } from "lucide-react";

interface PricingFeature {
  text: string;
  included: boolean;
}

interface PricingCardProps {
  name: string;
  description: string;
  price: string;
  buttonText: string;
  isPopular?: boolean;
  features: PricingFeature[];
  className?: string;
  priceInterval?: string;
  onButtonClick?: () => void;
}

export default function PricingCard({
  name,
  description,
  price,
  buttonText,
  isPopular = false,
  features,
  className = "",
  priceInterval = "/month",
  onButtonClick,
}: PricingCardProps) {
  return (
    <div
      className={`relative bg-white rounded-xl border transition-all duration-300 hover:shadow-xl ${
        isPopular
          ? "border-2 border-secondary shadow-lg scale-10"
          : "border-gray-200"
      } ${className}`}
    >
      {/* Popular Badge */}
      {isPopular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
          <div className="bg-secondary text-white px-4 py-1 rounded-full text-sm font-medium">
            Most Popular
          </div>
        </div>
      )}

      <div className="p-10 mx-auto">
        {/* Header */}
        <div className="text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-2">{name}</h3>
          <p className="text-gray-500 min-h-[40px]">{description}</p>
        </div>

        {/* Price */}
        <div className="mt-5 text-center">
          <div className="flex items-center justify-center">
            {price === "Custom" ? (
              <span className="text-4xl font-bold text-gray-900">Custom</span>
            ) : (
              <>
                <span className="text-4xl font-bold text-gray-900">
                  {price}
                </span>
                {priceInterval && (
                  <span className="text-gray-500 ml-2">{priceInterval}</span>
                )}
              </>
            )}
          </div>
        </div>

        {/* Features */}
        <ul className="mt-5 space-y-3">
          {features.map((feature, index) => (
            <li
              key={index}
              className="flex items-center space-x-3 text-gray-600"
            >
              <Check
                className={`w-5 h-5 ${
                  feature.included ? "text-secondary" : "text-gray-300"
                }`}
              />
              <span className={feature.included ? "" : "text-gray-400"}>
                {feature.text}
              </span>
            </li>
          ))}
        </ul>

        {/* Button */}
        <div className="mt-7">
          <button
            onClick={onButtonClick}
            className={`w-full py-3 px-4 rounded-lg font-semibold transition-all duration-200 ${
              isPopular
                ? "bg-primary text-white hover:bg-primary/90"
                : "border-2 border-primary text-primary hover:bg-primary/10"
            }`}
          >
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  );
}
