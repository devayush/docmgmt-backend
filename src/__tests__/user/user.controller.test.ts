import { getAllUsers, patchUserRole } from "../../modules/user/user.controller";
import * as userService from "../../modules/user/user.service";
import httpMocks from "node-mocks-http";

jest.mock("../../modules/user/user.service");

describe("User Controller", () => {
  afterEach(() => jest.clearAllMocks());

  it("should return users array", async () => {
    const mockUsers = [
      { id: "1", name: "A", email: "a@example.com", role: "ADMIN" },
    ];
    (userService.listUsers as jest.Mock).mockResolvedValue(mockUsers);

    const req = httpMocks.createRequest();
    const res = httpMocks.createResponse();

    await getAllUsers(req, res);

    expect(res._getStatusCode()).toBe(200);
    expect(res._getData()).toEqual(JSON.stringify(mockUsers));
  });

  it("should update user role", async () => {
    const mockUser = {
      id: "2",
      name: "B",
      email: "b@example.com",
      role: "EDITOR",
    };
    (userService.updateUserRole as jest.Mock).mockResolvedValue(mockUser);

    const req = httpMocks.createRequest({
      params: { id: "2" },
      body: { role: "EDITOR" },
    });
    const res = httpMocks.createResponse();

    await patchUserRole(req, res);

    expect(res._getStatusCode()).toBe(200);
    expect(res._getData()).toEqual(JSON.stringify(mockUser));
  });
});
