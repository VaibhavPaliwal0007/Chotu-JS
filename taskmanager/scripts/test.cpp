#include <bits/stdc++.h>
using namespace std;

int helper(int n)
{
    int temp2 = n, temp3 = n, temp4 = n;
    int ans = n;
    int x = 0, y = 0, z = 0;

    while (temp2 or temp3 or temp4)
    {
        x = temp2 / 2 > 0 ? temp2 / 2 : x;
        y = temp3 / 3 > 0 ? temp3 / 3 : y;
        z = temp4 / 4 > 0 ? temp4 / 4 : z;

        int hello = ((13 * x) / 12) + ((13 * y) / 12) + ((13 * z) / 12);

        ans = max(ans, hello);

        temp2 /= 2;
        temp3 /= 3;
        temp4 /= 4;
    }

    return ans;
}

int main()
{
    int n = 48;

    cout << helper(n);

    return 0;
}