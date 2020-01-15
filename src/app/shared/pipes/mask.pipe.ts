import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'mask',
    pure: true,
})
export class MaskPipe implements PipeTransform {

    private readonly valueSign = 'x';

    transform(value: string | undefined, mask: string): string | undefined {
        if (value) {
            const source: string[] = [ ...value ];
            const result: string[] = [];

            [ ...mask ].forEach((char, index) => {
                if (char === this.valueSign) {
                    result.push(source.shift());
                } else {
                    result.push(mask[index]);
                }
            });

            return result.join('');
        }
    }
}
