import { createGame } from "@/app/actions/games.actions";
import GameForm from "../GameForm";
import { getUser } from "@/lib/dal";

export default async function AddNewGame() {
  await getUser();
  return (
    <GameForm
      mode="create"
      action={createGame}
    />
  );
}