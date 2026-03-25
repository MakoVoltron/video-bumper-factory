import { prisma } from "@/lib/db/client";
import Link from "next/link";

const Footer = async () => {
  const templates = await prisma.templatePreview.findMany();

  return (
    <div className="w-full">
      <div className="bg-gray-900/80 px-20 py-10">
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12 md:col-span-4">
            <div className="grid grid-cols-2 md:grid-cols-1 gap-3">
              <h2 className="text-xl font-bold text-white">
                Our logo animation templates
              </h2>
              {templates.map((template) => (
                <Link
                  href={`/templates/${template.slug}`}
                  key={template.id}
                  className="inline-block w-fit text-sm font-bold text-white hover:text-purple-600 transition-all duration-500 relative after:content-[''] after:absolute after:-bottom-2 after:left-0 after:h-1 after:bg-purple-600 after:w-0 hover:after:w-3/4 after:transition-all after:duration-500"
                >
                  {template.title}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="mx-auto bg-gray-900/50 text-white/80 px-10 py-4">
        <p className="text-sm">
          © {new Date().getFullYear()} Video Bumper Factory
        </p>
      </div>
    </div>
  );
};

export default Footer;
