export async function uploadFileToS3(file: Express.Multer.File): Promise<string> {
  // Real implementation would upload to S3 and return the file URL
  // throw to ensure it's mocked in tests
  throw new Error("Not implemented");
}