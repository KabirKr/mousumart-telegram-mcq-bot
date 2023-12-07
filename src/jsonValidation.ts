function validateJsonInput(jsonInput: any) {
  try {
    const parsedJson = JSON.parse(jsonInput)
    if (!Array.isArray(parsedJson)) {
      return false
    }

    for (const item of parsedJson) {
      if (
        typeof item !== "object" ||
        !item.hasOwnProperty("id") ||
        !item.hasOwnProperty("question") ||
        !item.hasOwnProperty("options") ||
        !item.hasOwnProperty("answer")
      ) {
        return false
      }

      if (
        typeof item.id !== "number" ||
        typeof item.question !== "string" ||
        !Array.isArray(item.options) ||
        typeof item.answer !== "number"
      ) {
        return false
      }

      for (const option of item.options) {
        if (
          typeof option !== "object" ||
          !option.hasOwnProperty("id") ||
          !option.hasOwnProperty("value")
        ) {
          return false
        }

        if (typeof option.id !== "number" || typeof option.value !== "string") {
          return false
        }
      }
    }

    return true
  } catch (error) {
    return false
  }
}

export default validateJsonInput
