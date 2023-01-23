import { NavBar } from "@/components/Navbar/NavBar";
import { SingleMovie } from "@/components/SingleMovie/SingleMovie";
import { MainContent } from "@/layouts/MainContent";
import styles from "./movieById.module.scss";

export default function movieById() {
  return (
    <>
      <NavBar />
      <MainContent>
        <div className={styles.container}>
          <SingleMovie />
        </div>
      </MainContent>
    </>
  );
}
