import { NavBar } from "@/components/Navbar/NavBar";
import { MainContent } from "@/layouts/MainContent";
import { MovieGrid } from "@/layouts/MovieGrid/MovieGrid";
import moment from "moment";
import { useContext, useEffect, useState } from "react";
import { userContext } from "../_app";
import styles from "./Suggestions.module.scss";

export default function Suggestions() {
  const [loading, setLoading] = useState(true);
  const [suggestions, setSuggestions] = useState<SuggestionArr[]>([]);
  const userctx = useContext(userContext);
  const notifications = userctx?.user?.notifications;

  useEffect(() => {
    getSuggestedMovies();
    saveMovieSuggestions(notifications || []);
  }, []);

  function getSuggestedMovies() {
    setLoading(true);
    const suggestionsStringArr = localStorage.getItem("suggestions");
    if (!suggestionsStringArr) return;
    const suggestionsArr: SuggestionArr[] = JSON.parse(suggestionsStringArr);
    setSuggestions(suggestionsArr);
    setLoading(false);
  }

  function saveMovieSuggestions(notifications: Notifications[]) {
    const suggestionsArr: SuggestionArr[] = [];
    notifications.forEach((n) => {
      if (n.request) return;

      const fromArr = n.from.split("#");
      const userName = fromArr[0];
      const userId = parseInt(fromArr[1]);
      const movieName = fromArr[2];
      const movieId = parseInt(fromArr[3]);

      const newSuggestion = {
        userName,
        userId,
        movieName,
        movieId,
        time: n.createdAt,
      };
      suggestionsArr.push(newSuggestion);
    });

    localStorage.setItem("suggestions", JSON.stringify(suggestionsArr));
  }

  return (
    <>
      <NavBar />
      <MainContent title="Suggestions" isLoading={loading}>
        <MovieGrid>
          {suggestions.length ? (
            suggestions.map((s) => {
              return (
                <Suggestion
                  key={s.movieId * s.userId}
                  time={s.time}
                  movieId={s.movieId}
                  movieName={s.movieName}
                  userId={s.userId}
                  userName={s.userName}
                />
              );
            })
          ) : (
            <p>You don't have any suggestions</p>
          )}
        </MovieGrid>
      </MainContent>
    </>
  );
}

function Suggestion({
  movieId,
  movieName,
  userId,
  userName,
  time,
}: SuggestionProps) {
  const postTime = moment(time, "MMMM Do YYYY, h:mm:ss a").fromNow();

  return (
    <div>
      <p>{movieName}</p>
      <p>{userName}</p>
      <p>{postTime}</p>
    </div>
  );
}

interface Notifications {
  id: number;
  from: string;
  request: boolean;
  suggestion: boolean;
  createdAt: string;
}
interface SuggestionArr {
  userName: string;
  userId: number;
  movieName: string;
  movieId: number;
  time: string;
}
interface SuggestionProps {
  userName: string;
  userId: number;
  movieName: string;
  movieId: number;
  time: string;
}
