/* eslint-disable @next/next/no-img-element */
import { governmentSchemes } from '@/data/governmentSchemes';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, CheckCircle2, FileText, Info, Phone } from 'lucide-react';

export function generateStaticParams() {
  return governmentSchemes.map((scheme) => ({
    id: scheme.id,
  }));
}

export default async function SchemeDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const scheme = governmentSchemes.find((s) => s.id === id);

  if (!scheme) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Link href="/schemes" className="inline-flex items-center text-green-600 hover:text-green-700 mb-6">
        <ArrowLeft className="h-4 w-4 mr-2" />
        योजनाओं पर वापस जाएं (Back to Schemes)
      </Link>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="h-48 md:h-64 relative bg-green-100">
          <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-green-400 opacity-90 mix-blend-multiply"></div>
          <img 
            src={scheme.image} 
            alt={scheme.name}
            className="w-full h-full object-cover mix-blend-overlay opacity-50"
          />
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <span className="inline-block px-3 py-1 bg-white/20 rounded-full text-sm font-medium mb-3 backdrop-blur-sm">
              {scheme.category.toUpperCase()}
            </span>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">{scheme.nameHindi}</h1>
            <h2 className="text-xl opacity-90">{scheme.name}</h2>
          </div>
        </div>

        <div className="p-6 md:p-8 space-y-8">
          <section>
            <h3 className="text-xl font-semibold mb-4 flex items-center text-gray-800">
              <Info className="h-5 w-5 mr-2 text-green-600" />
              योजना के बारे में (About)
            </h3>
            <p className="text-gray-700 leading-relaxed mb-2">{scheme.descriptionHindi}</p>
            <p className="text-gray-600 leading-relaxed text-sm">{scheme.description}</p>
          </section>

          <section>
            <h3 className="text-xl font-semibold mb-4 flex items-center text-gray-800">
              <CheckCircle2 className="h-5 w-5 mr-2 text-green-600" />
              लाभ (Benefits)
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <ul className="space-y-3">
                {scheme.benefitsHindi.map((benefit, index) => (
                  <li key={`hi-${index}`} className="flex items-start">
                    <div className="h-2 w-2 mt-2 rounded-full bg-green-500 mr-3 flex-shrink-0"></div>
                    <span className="text-gray-700">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section>
            <h3 className="text-xl font-semibold mb-4 flex items-center text-gray-800">
              <FileText className="h-5 w-5 mr-2 text-green-600" />
              पात्रता और दस्तावेज (Eligibility & Documents)
            </h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-medium text-gray-800 mb-3">पात्रता:</h4>
                <ul className="space-y-2">
                  {scheme.eligibilityHindi.map((item, index) => (
                    <li key={index} className="text-gray-700 text-sm flex items-start">
                      <span className="text-green-500 mr-2">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-gray-800 mb-3">आवश्यक दस्तावेज:</h4>
                <ul className="space-y-2">
                  {scheme.documentsHindi.map((doc, index) => (
                    <li key={index} className="text-gray-700 text-sm flex items-start">
                      <span className="text-green-500 mr-2">•</span>
                      {doc}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          <div className="border-t pt-8 mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center text-gray-600">
              <Phone className="h-5 w-5 mr-2" />
              <span>हेल्पलाइन: <strong className="text-gray-900">{scheme.helplineNumber}</strong></span>
            </div>
            <a 
              href={scheme.website}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto text-center px-8 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors shadow-md hover:shadow-lg"
            >
              आधिकारिक वेबसाइट पर जाएं
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
