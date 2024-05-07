export const HTTP_STATUSES = {
    OK_200: 200,

    BAD_REQUEST_400: 400,
    NOT_FOUND_404: 404,
    TOO_MANY_REQUESTS_429: 429
}

type HttpStatusKeys = keyof typeof HTTP_STATUSES

export type HttpStatusType = (typeof HTTP_STATUSES)[HttpStatusKeys]
