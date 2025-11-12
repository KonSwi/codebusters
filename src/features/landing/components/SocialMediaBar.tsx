import React from "react";
import Link from "next/link";
import Image from "next/image";
import { SOCIAL_LINKS } from "../constants/socialLinks";

export const SocialMediaBar = () => {
  
  return (
    <div className="bg-dark">
      <div className="container flex justify-end gap-8 pr-10 py-2.5">
        {SOCIAL_LINKS.map(({ name, href, src, w, h }) => (
          <Link
            key={name}
            href={href}
            aria-label={name}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center rounded-md"
            title={name}
          >
            <Image
              src={src}
              alt={name}
              width={w}
              height={h}
              priority
              className="h-5 w-auto"
            />
          </Link>
        ))}
      </div>
    </div>
  );
};
