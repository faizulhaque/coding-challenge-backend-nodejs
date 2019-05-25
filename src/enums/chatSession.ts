export enum ChatSessionFor {
    VOICE = 'voice',
    VIDEO = 'video',
    TEXT = 'text'
}

export enum ChatSessionState {
    DEFAULT = 1,
    PENDING = 0,
    INITIATED = 10,
    STARTED = 20,
    ENDED = 30,
    REJECTED = 40,
    MISSED = 50,
    ENDED_BY_SERVER = 60
}
