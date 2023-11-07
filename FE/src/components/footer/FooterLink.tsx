import { Link } from "react-router-dom";

type FooterLinkProps = {
  title: string;
  links: { name: string; url: string }[];
};

const FooterLink = ({ title, links }: FooterLinkProps) => {
  return (
    <>
      <ul>
        <h1 className="mb-1 font-semibold">{title}</h1>
        {links.map((item: { name: string; url: string }) => (
          <li key={item.name}>
            <Link
              to={item.url}
              className="text-black hover:text-rose-500 text-[12px]"
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default FooterLink;
