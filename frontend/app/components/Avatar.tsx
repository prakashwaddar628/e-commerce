import Image from "next/image";
import { FaUserCircle } from "react-icons/fa";

interface AvtaraProps {
  src?: string | null | undefined;
}

const Avatar: React.FC<AvtaraProps> = ({ src }) => {
  if (src) {
    return <Image
      src={src}
      alt="Avatar"
      className="rounded-full"
      height={30}
      width={30}
    />;
  }
  return <FaUserCircle size={24} color="#333" />;
};

export default Avatar;
