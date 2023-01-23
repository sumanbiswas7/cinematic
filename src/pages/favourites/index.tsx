import { NavBar } from "@/components/Navbar/NavBar";
import { MainContent } from "@/layouts/MainContent";
import styles from "./Favourites.module.scss";

export default function Favourites() {
  return (
    <>
      <NavBar />
      <MainContent title="Favourites">
        <p>Favourites</p>
      </MainContent>
    </>
  );
}
