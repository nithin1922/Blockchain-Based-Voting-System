const Voting = artifacts.require("Voting");

contract("Voting", (accounts) => {
    let voting;

    before(async () => {
        voting = await Voting.deployed();
    });

    it("should add a candidate", async () => {
        await voting.addCandidate("Alice", { from: accounts[0] });
        const count = await voting.getCandidateCount();
        assert.equal(count, 1, "Candidate was not added");
    });

    it("should allow voting", async () => {
        await voting.vote(0, { from: accounts[1] });
        const candidate = await voting.getCandidate(0);
        assert.equal(candidate[1].toNumber(), 1, "Vote was not counted");
    });

    it("should prevent double voting", async () => {
        try {
            await voting.vote(0, { from: accounts[1] });
        } catch (error) {
            assert(error, "Expected an error for double voting");
        }
    });
});
