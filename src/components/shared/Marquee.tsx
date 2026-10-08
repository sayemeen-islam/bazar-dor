import baseUrl from "@/services/baseUrl";
import { toBanglaNumber } from "@/utils/number";
import { translateUnit } from "@/utils/translations";
import Link from "next/link";
import React from "react";
import {
  IoCaretDownSharp,
  IoCaretUpSharp,
  IoTriangleSharp,
} from "react-icons/io5";
import MarqueeText from "react-marquee-text";
interface IMarquee {
  id: number;
  slug: string;
  nameBn: string;
  category: string;
  categoryNameBn: string;
  categoryIcon: string;
  unit: string;
  image: string;
  today: number;
  yesterday: number;
  lastWeek: number;
  lastMonth: number;
  change: Change;
}

interface Change {
  dir: string;
  pct: number;
}
const Marquee = async () => {
  const res = await fetch(`${baseUrl}/products`);
  const data: IMarquee[] = await res.json();
  console.log("from marquee", data);

  return (
    <div className="border border-base-300">
      <MarqueeText direction="right" duration={10}>
        {data.map((item) => (
          <div
            key={item.id}
            className="flex gap-2 border-r border-base-200 py-1 pl-2 pr-3"
          >
            <span>{item.image}</span>
            <span>{item.nameBn}</span>
            <span className="flex gap-0.5">
              {" "}
              <span>{toBanglaNumber(item.today)}</span>
              <span>টাকা/{translateUnit(item.unit)}</span>
            </span>
            <span className="flex gap-0.5">
              {" "}
              <span
                className={`${
                  (item.change.dir === "up" && "text-success") ||
                  (item.change.dir === "down" && "text-error") ||
                  (item.change.dir === "flat" && "text-base-content")
                }`}
              >
                {(item.change.dir === "up" && "▲") ||
                  (item.change.dir === "down" && "▼") ||
                  (item.change.dir === "flat" && "—")}
              </span>
              <span
                className={`${
                  (item.change.dir === "up" && "text-success") ||
                  (item.change.dir === "down" && "text-error") ||
                  (item.change.dir === "flat" && "text-base-content")
                }`}
              >
                {(item.change.dir === "up" &&
                  `${toBanglaNumber(item.change.pct)}`) ||
                  (item.change.dir === "down" &&
                    `${toBanglaNumber(String(item.change.pct).slice(1))}`) ||
                  (item.change.dir === "flat" && `০.০`)}
                %
              </span>
            </span>
          </div>
        ))}
      </MarqueeText>
    </div>
  );
};

export default Marquee;
