/**
 * Defines helper / utility methods for working with the authentication (access) token.
 */
export class AuthenticationUtil {
  public static decodeUserId(token: string): number {
    if (!token) {
      return undefined;
    }

    const sections: string[] = token.split('.');
    if (!sections || sections.length !== 3) {
      return undefined;
    }

    // the 2nd section contains the claim information
    const decodedClaim = JSON.parse(atob(sections[1]));

    return Number(decodedClaim.sub);
  }
}
