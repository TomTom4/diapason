export default function SoundWave({ cents }: { cents: number }) {
  return (
    <svg
      width="244"
      height="213"
      viewBox="0 0 244 213"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <ellipse
        cx="122"
        cy="106.5"
        rx="17"
        ry="106.5"
        className={Math.abs(cents) < 10 ? "fill-primary" : "fill-gray-300"}
      />
      <ellipse
        cx="160.5"
        cy="106.5"
        rx="8.5"
        ry="73.5"
        className={cents >= 10 && cents < 30 ? "fill-primary" : "fill-gray-300"}
      />
      <ellipse
        cx="188.5"
        cy="107"
        rx="6.5"
        ry="40"
        className={cents >= 30 && cents < 50 ? "fill-primary" : "fill-gray-300"}
      />
      <ellipse
        cx="237.5"
        cy="107"
        rx="6.5"
        ry="40"
        className={cents >= 50 && cents < 80 ? "fill-primary" : "fill-gray-300"}
      />
      <ellipse
        cx="214.5"
        cy="106.5"
        rx="6.5"
        ry="13.5"
        className={
          cents >= 80 && cents < 100 ? "fill-primary" : "fill-gray-300"
        }
      />
      <ellipse
        cx="8.5"
        cy="73.5"
        rx="8.5"
        ry="73.5"
        transform="matrix(-1 0 0 1 92 33)"
        className={
          cents <= -10 && cents > -30 ? "fill-primary" : "fill-gray-300"
        }
      />
      <ellipse
        cx="6.5"
        cy="40"
        rx="6.5"
        ry="40"
        transform="matrix(-1 0 0 1 62 67)"
        className={
          cents <= -30 && cents > -50 ? "fill-primary" : "fill-gray-300"
        }
      />
      <ellipse
        cx="6.5"
        cy="40"
        rx="6.5"
        ry="40"
        transform="matrix(-1 0 0 1 13 67)"
        className={
          cents <= -50 && cents > -80 ? "fill-primary" : "fill-gray-300"
        }
      />
      <ellipse
        cx="6.5"
        cy="13.5"
        rx="6.5"
        ry="13.5"
        transform="matrix(-1 0 0 1 36 93)"
        className={
          cents <= -80 && cents > -100 ? "fill-primary" : "fill-gray-300"
        }
      />
    </svg>
  );
}
