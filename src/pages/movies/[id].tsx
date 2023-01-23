import { NavBar } from "@/components/Navbar/NavBar";
import { MainContent } from "@/layouts/MainContent";
import styles from "./movieById.module.scss";

export default function movieById() {
  return (
    <>
      <NavBar />
      <MainContent>
        <p>Favourites</p>
      </MainContent>
    </>
  );
}
