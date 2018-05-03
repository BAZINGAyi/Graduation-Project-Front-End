export class User {

  constructor(public id: number,
              public description: string,
              public headUrl: string,
              public name: string,
              public password: string,
              public salt: string,
              public mail: string,
              public describe: string) {
  }
}
