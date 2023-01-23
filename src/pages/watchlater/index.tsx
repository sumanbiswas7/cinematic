import { NavBar } from "@/components/Navbar/NavBar";
import { MainContent } from "@/layouts/MainContent";
import styles from "./WatchLater.module.scss";

export default function WatchLater() {
  return (
    <>
      <NavBar />
      <MainContent>
        <p>Watch Later</p>
      </MainContent>
    </>
  );
}
