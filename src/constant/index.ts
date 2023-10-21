export const REGEX = {
  EMAIL: /\S+@\S+\.\S+/,
  PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&+-/]{8,}$/,
}

export const ICONS: Array<string> = [
  'mdi-emoticon',
  'mdi-emoticon-sad',
]

export const VALID_ICON: string = ICONS[0]
export const INVALID_ICON: string = ICONS[1]