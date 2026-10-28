import { footer, nav } from '@/lib/content'

export default function Footer() {
  return (
    <footer className="bg-[#181f0d] px-4 pb-28 pt-20 text-[#F5F5F0] md:px-8 md:pb-20 md:pt-28">
      <div className="mx-auto max-w-7xl">
        <p className="ck-d text-[48px] leading-[0.9] md:text-[72px]">
          Café <em className="font-playfair italic text-[#C1121F]">Valparaíso</em>
        </p>

        <blockquote className="mt-7 max-w-xl font-playfair text-[20px] italic md:text-[24px]">
          {footer.quote}
        </blockquote>

        <p className="mt-7 text-[15px]">{footer.line}</p>

        <nav aria-label="Pie de página" className="mt-9">
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-[15px] font-bold">
            {nav.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="hover:text-[#C1121F]">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  )
}
