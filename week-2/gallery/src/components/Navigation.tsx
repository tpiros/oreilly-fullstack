import Link from 'next/link';

const Navigation = () => {
  const navItems = [
    {
      text: 'Image Upload',
      href: '/',
    },
    {
      text: 'Image Gallery',
      href: '/image-gallery',
    },
  ];
  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <Link href="/" className="btn btn-ghost normal-case text-xl">
          Wonder Workshop
        </Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          {navItems.map((navItem, idx) => (
            <li key={idx}>
              <Link href={navItem.href}>{navItem.text}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Navigation;
