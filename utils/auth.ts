import { Auth } from "aws-amplify";

export interface User {
  raw: any;
  username: string;
  picture: string;
}

function getUsername(cognito): string {
  const email: string = cognito.attributes?.email;
  if (!email) return cognito.username;
  return email.substring(0, email.indexOf("@"));
}

export async function getUser(): Promise<User | undefined> {
  try {
    const cognito = await Auth.currentAuthenticatedUser();
    const username = getUsername(cognito);
    return { raw: cognito, username, picture: "/img/icons/user.svg" };
  } catch (ex) {
    if ("The user is not authenticated" == ex) {
      return undefined;
    }
    throw ex;
  }
}

export async function logOut() {
  await Auth.signOut();
}
