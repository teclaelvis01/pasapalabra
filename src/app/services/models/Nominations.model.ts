
export const StatusIClosed = 'closed';
export const StatusIOpen = 'open';
export enum StatusI{
    closed = "closed",
    open = "open"
}
export class SetupNomination {
    status: StatusI = StatusI.closed;
}
export interface IParticipate {
    id: string;
    imgUrl: string;
    name: string;
    position: number;
    votes: string[];
}
export class Participate implements IParticipate {
    votes: string[] = [];
    name: string;
    id: string;
    position: number;
    imgUrl: string;
    constructor(name: string, position: number, imgUrl: string) {
        this.name = name;
        this.position = position;
        this.imgUrl = `https://firebasestorage.googleapis.com/v0/b/pasapalabra-debe0.appspot.com/o/${imgUrl}.jpeg?alt=media`;
        this.id = name.split(' ').join('_');
    }
}
export interface INomination {
    id: string;
    name: string;
    position: number;
    participates: IParticipate[]
}
export class Nomination implements INomination {
    id:string;
    name: string;
    position: number;
    participates: IParticipate[];
    constructor(name: string, position: number = 0, participates: IParticipate[]) {
        this.name = name;
        this.position = position;
        this.participates = participates;
        this.id = name.split(' ').join('_');
    }

}

interface LooseObject {
    [key: string]: any
}

export class Nominations {
    private nominations:LooseObject = {};
    private countNominations= 0;

    constructor() {
        this.setup();
    }

    private setup() {
        // Infantil
        this.create("Ministerio Infantil",
            [
                new Participate("Geraldine Rodriguez España", 1, "Geraldine_Rodriguez_España"),
                new Participate("Nancy Elisabeth Reyes Martinelli", 2, "Nancy_Elisabeth_Reyes_Martinelli"),
                new Participate("Rosa Ana Ortiz Eduardo", 3, "Rosa_Ana_Ortiz_Eduardo"),
                new Participate("Tomás y Sara Sánchez Garralón", 4, "Tomás__y_Sara_Sánchez_Garralón"),
            ]);

        // Ministerio de Evangelismo

        this.create("Ministerio de Evangelismo",
            [
                new Participate("Antonio Gómez Carreño", 1, "Antonio_Gómez_Carreño"),
                new Participate("Aracely Henao Ariza", 2, "Aracely_Henao_Ariza"),
                new Participate("Yolanda del Castillo Rivero", 3, "Yolanda_del_Castillo_Rivero"),
            ]);


        // Ministerio de Bautismos
        this.create("Ministerio de Bautismos",
            [
                new Participate("Giuseppe Antonio Fanizzi Carruyo", 1, "Giuseppe_Antonio_Fanizzi_Carruyo"),
                new Participate("María Frenciu Lazic", 2, "María_Frenciu_Lazic"),
                new Participate("Mauricio Adrian Maccio Pierini", 3, "Mauricio_Adrian_Maccio_Pierini"),
                new Participate("Priscila Esperanza Matute", 4, "Priscila_Esperanza_Matute"),
            ]);
        // Áreas de Hall
        this.create("Áreas de Hall",
            [
                new Participate("Irina de las Mercedes", 1, "Irina_de_las_Mercedes"),
                new Participate("William Ricardo Galvis Silva", 2, "William_Ricardo_Galvis_Silva"),
                new Participate("Pilar Jaramillo", 3, "Pilar_Jaramillo"),
                new Participate("Sara Broukhouse Gutiérrez", 4, "Sara_Broukhouse_Gutiérrez"),
            ]);

        // Mejor siervo del área de audiovisuales
        this.create("Mejor siervo del área de audiovisuales",
            [
                new Participate("Aníbal", 1, "Aníbal"),
                new Participate("Antonio LLorente", 2, "Antonio_LLorente"),
                new Participate("Laura Gil", 3, "Laura_Gil"),
                new Participate("Samuel Asensio", 3, "Samuel_Asensio"),
            ]);
        

    }


    private create(name: string, participates: IParticipate[]) {
        this.countNominations++;
        const nomination = new Nomination(name, this.countNominations, participates);
        this.nominations[nomination.id] = nomination;
    }

    /**
     *
     *
     * @return {INomination[]} 
     * @memberof Nominations
     */
    getNominations() {
        return this.nominations;
    }
}
