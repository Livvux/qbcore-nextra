import Link from 'next/link'

const NavbarCTA = () => {
  return (
    <div className="hidden md:block">
      <Link
        href="https://fivemx.com/qbcore-scripts"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-[#DB123E] to-[#FF4B6E] px-4 py-2 text-sm font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#DB123E]/25"
      >
        QB Scripts
      </Link>
    </div>
  )
}

export default NavbarCTA
