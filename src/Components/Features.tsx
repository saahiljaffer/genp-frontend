/* This example requires Tailwind CSS v2.0+ */
import {
  AnnotationIcon,
  GlobeAltIcon,
  LightningBoltIcon,
  ScaleIcon,
} from "@heroicons/react/outline";

const features = [
  {
    name: "Easy to Use",
    description:
      "Our application was designed to be extremely easy to use and can be used by anyone.",
    icon: GlobeAltIcon,
  },
  {
    name: "Flexible to your creativity",
    description:
      "GenP was designed to enable designers to be extremely creative by allowing users flexibility in their design choices.",
    icon: ScaleIcon,
  },
  {
    name: "Instant document generation",
    description:
      "This platform instantly generates documents so that you can see (and download) your work in real time.",
    icon: LightningBoltIcon,
  },
  {
    name: "Use HTML and CSS to make anything",
    description:
      "By using HTML and CSS, we enable you to create documents using familiar and flexible tools.",
    icon: AnnotationIcon,
  },
];

export default function Features() {
  return (
    <div className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">
            Documents
          </h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            A better way to create documents
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            GenP is the best platform to create any document
          </p>
        </div>

        <div className="mt-10">
          <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
            {features.map((feature) => (
              <div key={feature.name} className="relative">
                <dt>
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                    <feature.icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <p className="ml-16 text-lg leading-6 font-medium text-gray-900">
                    {feature.name}
                  </p>
                </dt>
                <dd className="mt-2 ml-16 text-base text-gray-500">
                  {feature.description}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
