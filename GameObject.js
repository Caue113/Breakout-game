export class GameObject {
    Position = [ X = 0, Y = 0, Z = 0 ];
    Position2 = {X :  0, Y : 0, Z : 0 };

    Rotation = { X: 0, Y: 0, Z: 0 };
    Scale = {X: 1, Y: 1, Z: 1};

    Transform = [this.Position, this.Rotation, this.Scale]
}