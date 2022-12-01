import { useNavigate } from "react-router-dom";

type SectionButtonProps = {
  name: string;
};

export default function SectionButton(props: SectionButtonProps) {
  const navigate = useNavigate();
  const { name } = props;
  return (
    <button
      onClick={() => {
        navigate(`${name.toLowerCase()}`);
      }}
      className="w-72 h-72 border text-xl shadow rounded"
    >
      {name}
    </button>
  );
}
