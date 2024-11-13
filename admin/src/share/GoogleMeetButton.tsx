import { Button } from "antd";
import { Link } from "react-router-dom";

interface Props {
  to: string;
}

const GoogleMeetButton = (props: Props) => {
  const { to } = props;
  return (
    <Link to={to} target="_blank">
      <Button className="w-full">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1.22em"
          height="1em"
          viewBox="0 0 256 211"
        >
          <path
            fill="#00832d"
            d="m144.822 105.322l24.957 28.527l33.562 21.445l5.838-49.792l-5.838-48.669l-34.205 18.839z"
          />
          <path
            fill="#0066da"
            d="M0 150.66v42.43c0 9.688 7.864 17.554 17.554 17.554h42.43l8.786-32.059l-8.786-27.925l-29.11-8.786z"
          />
          <path
            fill="#e94235"
            d="M59.984 0L0 59.984l30.876 8.765l29.108-8.765l8.626-27.545z"
          />
          <path fill="#2684fc" d="M.001 150.679h59.983V59.983H.001z" />
          <path
            fill="#00ac47"
            d="M241.659 25.398L203.34 56.834v98.46l38.477 31.558c5.76 4.512 14.186.4 14.186-6.922V32.18c0-7.403-8.627-11.495-14.345-6.781"
          />
          <path
            fill="#00ac47"
            d="M144.822 105.322v45.338H59.984v59.984h125.804c9.69 0 17.553-7.866 17.553-17.554v-37.796z"
          />
          <path
            fill="#ffba00"
            d="M185.788 0H59.984v59.984h84.838v45.338l58.52-48.49V17.555c0-9.69-7.864-17.554-17.554-17.554"
          />
        </svg>
      </Button>
    </Link>
  );
};

export default GoogleMeetButton;
